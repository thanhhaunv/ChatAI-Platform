import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { ChatService } from '../chat/chat.service';
import { OpenAIService } from '../chat/agents/openai.service';

interface AuthenticatedSocket extends Socket {
  userId?: number;
  userEmail?: string;
}

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private userSockets: Map<number, string> = new Map(); // userId -> socketId

  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    private chatService: ChatService,
    private openaiService: OpenAIService,
  ) {}

  // Handle client connection
  async handleConnection(client: AuthenticatedSocket) {
    try {
      // Extract token from handshake
      const token = client.handshake.auth.token || client.handshake.headers.authorization?.split(' ')[1];

      if (!token) {
        console.log('❌ No token provided');
        client.disconnect();
        return;
      }

      // Verify JWT
      const payload = this.jwtService.verify(token);
      client.userId = payload.sub;
      client.userEmail = payload.email;

      // Store user socket
      this.userSockets.set(client.userId, client.id);

      console.log(`✅ Client connected: ${client.id} (User: ${client.userEmail})`);
      client.emit('connected', { message: 'Connected to WebSocket server' });
    } catch (error) {
      console.log('❌ Invalid token:', error.message);
      client.disconnect();
    }
  }

  // Handle client disconnect
  handleDisconnect(client: AuthenticatedSocket) {
    if (client.userId) {
      this.userSockets.delete(client.userId);
      console.log(`❌ Client disconnected: ${client.id} (User: ${client.userEmail})`);
    }
  }

  // Join a conversation room
  @SubscribeMessage('join_thread')
  async handleJoinThread(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { threadId: string },
  ) {
    try {
      // Verify user has access to this thread
      const conversation = await this.prisma.conversation.findUnique({
        where: { threadId: data.threadId },
        include: { project: true },
      });

      if (!conversation) {
        client.emit('error', { message: 'Conversation not found' });
        return;
      }

      // Check user access
      const member = await this.prisma.projectMember.findFirst({
        where: {
          projectId: conversation.projectId,
          userId: client.userId,
        },
      });

      if (!member) {
        client.emit('error', { message: 'Access denied' });
        return;
      }

      // Join room
      client.join(data.threadId);
      console.log(`👤 User ${client.userEmail} joined thread: ${data.threadId}`);

      client.emit('joined_thread', {
        threadId: data.threadId,
        message: 'Successfully joined conversation',
      });
    } catch (error) {
      client.emit('error', { message: error.message });
    }
  }

  // Leave a conversation room
  @SubscribeMessage('leave_thread')
  handleLeaveThread(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { threadId: string },
  ) {
    client.leave(data.threadId);
    console.log(`👋 User ${client.userEmail} left thread: ${data.threadId}`);
  }

  // Typing indicator
  @SubscribeMessage('typing')
  handleTyping(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { threadId: string; isTyping: boolean },
  ) {
    // Broadcast to others in the room (except sender)
    client.to(data.threadId).emit('user_typing', {
      userId: client.userId,
      userEmail: client.userEmail,
      isTyping: data.isTyping,
    });
  }

  // Send message with streaming
  @SubscribeMessage('send_message')
  async handleSendMessage(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: {
      threadId: string;
      content: string;
      agentId: number;
      projectId: number;
    },
  ) {
    try {
      // 1. Get conversation
      const conversation = await this.prisma.conversation.findUnique({
        where: { threadId: data.threadId },
      });

      if (!conversation) {
        client.emit('error', { message: 'Conversation not found' });
        return;
      }

      // 2. Get agent
      const agent = await this.prisma.agent.findUnique({
        where: { id: data.agentId },
      });

      if (!agent || !agent.active) {
        client.emit('error', { message: 'Agent not found or inactive' });
        return;
      }

      // 3. Save user message
      const userMessage = await this.prisma.message.create({
        data: {
          conversationId: conversation.id,
          userId: client.userId,
          agentId: agent.id,
          content: data.content,
          role: 'user',
          tokens: Math.ceil(data.content.length / 4),
        },
      });

      // Emit user message to room
      this.server.to(data.threadId).emit('new_message', {
        id: userMessage.id,
        content: userMessage.content,
        role: 'user',
        userId: client.userId,
        createdAt: userMessage.createdAt,
      });

      // 4. Get context
      const messages = await this.prisma.message.findMany({
        where: { conversationId: conversation.id },
        orderBy: { createdAt: 'desc' },
        take: 10,
        select: { role: true, content: true },
      });

      const context = [
        { role: 'system' as const, content: 'You are a helpful AI assistant.' },
        ...messages.reverse().map((msg) => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
        })),
      ];

      // 5. Stream AI response
      if (agent.type === 'openai') {
        await this.streamOpenAIResponse(
          client,
          data.threadId,
          conversation.id,
          agent,
          context,
        );
      } else {
        // Non-streaming fallback
        const response = await this.chatService.sendMessage(client.userId, data.projectId, {
          content: data.content,
          agentId: data.agentId,
          threadId: data.threadId,
        });

        this.server.to(data.threadId).emit('new_message', response.assistantMessage);
      }

      // 6. Update conversation timestamp
      await this.prisma.conversation.update({
        where: { id: conversation.id },
        data: { updatedAt: new Date() },
      });
    } catch (error) {
      console.error('Send message error:', error);
      client.emit('error', { message: error.message });
    }
  }

  // Stream OpenAI response
  private async streamOpenAIResponse(
    client: AuthenticatedSocket,
    threadId: string,
    conversationId: number,
    agent: any,
    context: any[],
  ) {
    try {
      const stream = await this.openaiService.streamChat(context, agent.model);

      let fullContent = '';
      const messageId = Date.now(); // Temporary ID

      // Emit stream start
      this.server.to(threadId).emit('message_stream_start', {
        id: messageId,
        role: 'assistant',
        agentId: agent.id,
      });

      // Process stream
      stream.on('data', (chunk: Buffer) => {
        const lines = chunk.toString().split('\n').filter((line) => line.trim() !== '');

        for (const line of lines) {
          if (line.includes('[DONE]')) {
            continue;
          }

          if (line.startsWith('data: ')) {
            try {
              const json = JSON.parse(line.substring(6));
              const content = json.choices[0]?.delta?.content;

              if (content) {
                fullContent += content;
                // Emit chunk to room
                this.server.to(threadId).emit('message_stream_chunk', {
                  id: messageId,
                  content: content,
                });
              }
            } catch (e) {
              // Skip parsing errors
            }
          }
        }
      });

      stream.on('end', async () => {
        // Save complete message to DB
        const assistantMessage = await this.prisma.message.create({
          data: {
            conversationId: conversationId,
            agentId: agent.id,
            content: fullContent,
            role: 'assistant',
            tokens: Math.ceil(fullContent.length / 4), // Estimate
          },
        });

        // Emit stream end
        this.server.to(threadId).emit('message_stream_end', {
          id: assistantMessage.id,
          content: fullContent,
          role: 'assistant',
          tokens: assistantMessage.tokens,
          createdAt: assistantMessage.createdAt,
        });
      });

      stream.on('error', (error: Error) => {
        console.error('Stream error:', error);
        client.emit('error', { message: 'Failed to stream response' });
      });
    } catch (error) {
      console.error('Stream setup error:', error);
      client.emit('error', { message: error.message });
    }
  }
}
