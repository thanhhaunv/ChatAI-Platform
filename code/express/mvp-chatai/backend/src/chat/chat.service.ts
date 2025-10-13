import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ConversationsService } from '../conversations/conversations.service';
import { OpenAIService } from './agents/openai.service';
import { GeminiService } from './agents/gemini.service';
import { SendMessageDto } from './dto/send-message.dto';

@Injectable()
export class ChatService {
  constructor(
    private prisma: PrismaService,
    private conversationsService: ConversationsService,
    private openaiService: OpenAIService,
    private geminiService: GeminiService,
  ) {}

  async sendMessage(userId: number, projectId: number, dto: SendMessageDto) {
    // 1. Get or create conversation
    let conversation;
    if (dto.threadId) {
      conversation = await this.conversationsService.getByThreadId(dto.threadId, userId);
    } else {
      // Create new conversation if no threadId provided
      conversation = await this.conversationsService.create(projectId, userId, {
        title: 'New Chat',
      });
    }

    // 2. Get agent
    const agent = await this.prisma.agent.findUnique({
      where: { id: dto.agentId },
    });

    if (!agent || !agent.active) {
      throw new NotFoundException('Agent not found or inactive');
    }

    // 3. Get conversation context (last 10 messages)
    const context = await this.getConversationContext(conversation.id);

    // 4. Save user message
    const userMessage = await this.prisma.message.create({
      data: {
        conversationId: conversation.id,
        userId: userId,
        agentId: agent.id,
        content: dto.content,
        role: 'user',
        tokens: 0,
      },
    });

    // 5. Prepare messages for AI
    const messages = [
      {
        role: 'system' as const,
        content: 'You are a helpful AI assistant.',
      },
      ...context,
      {
        role: 'user' as const,
        content: dto.content,
      },
    ];

    // 6. Call AI agent
    let aiResponse: { content: string; tokens: number };

    try {
      if (agent.type === 'openai') {
        aiResponse = await this.openaiService.chat(messages, agent.model);
      } else if (agent.type === 'gemini') {
        aiResponse = await this.geminiService.chat(messages);
      } else {
        throw new BadRequestException('Unsupported agent type');
      }
    } catch (error) {
      // Save error message
      await this.prisma.message.create({
        data: {
          conversationId: conversation.id,
          agentId: agent.id,
          content: `Error: ${error.message}`,
          role: 'assistant',
          tokens: 0,
        },
      });
      throw error;
    }

    // 7. Save AI response
    const assistantMessage = await this.prisma.message.create({
      data: {
        conversationId: conversation.id,
        agentId: agent.id,
        content: aiResponse.content,
        role: 'assistant',
        tokens: aiResponse.tokens,
      },
    });

    // 8. Update user message tokens (estimate)
    await this.prisma.message.update({
      where: { id: userMessage.id },
      data: { tokens: Math.ceil(dto.content.length / 4) }, // Rough estimate
    });

    // 9. Update conversation timestamp
    await this.prisma.conversation.update({
      where: { id: conversation.id },
      data: { updatedAt: new Date() },
    });

    // 10. Return response
    return {
      threadId: conversation.threadId,
      userMessage: {
        id: userMessage.id,
        content: userMessage.content,
        role: userMessage.role,
        createdAt: userMessage.createdAt,
      },
      assistantMessage: {
        id: assistantMessage.id,
        content: assistantMessage.content,
        role: assistantMessage.role,
        tokens: assistantMessage.tokens,
        createdAt: assistantMessage.createdAt,
      },
      agent: {
        id: agent.id,
        name: agent.name,
        type: agent.type,
      },
    };
  }

  // Get conversation context (last 10 messages)
  private async getConversationContext(conversationId: number) {
    const messages = await this.prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: {
        role: true,
        content: true,
      },
    });

    // Reverse to chronological order
    return messages.reverse().map((msg) => ({
      role: msg.role as 'user' | 'assistant' | 'system',
      content: msg.content,
    }));
  }

  // Get message history
  async getMessageHistory(threadId: string, userId: number) {
    const conversation = await this.conversationsService.getByThreadId(threadId, userId);

    const messages = await this.prisma.message.findMany({
      where: { conversationId: conversation.id },
      orderBy: { createdAt: 'asc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        agent: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
      },
    });

    return {
      conversation: {
        id: conversation.id,
        threadId: conversation.threadId,
        title: conversation.title,
      },
      messages,
    };
  }

  // Get token usage for a conversation
  async getTokenUsage(threadId: string, userId: number) {
    const conversation = await this.conversationsService.getByThreadId(threadId, userId);

    const totalTokens = await this.prisma.message.aggregate({
      where: { conversationId: conversation.id },
      _sum: { tokens: true },
    });

    const messageCount = await this.prisma.message.count({
      where: { conversationId: conversation.id },
    });

    return {
      threadId: conversation.threadId,
      totalTokens: totalTokens._sum.tokens || 0,
      messageCount,
      estimatedCost: ((totalTokens._sum.tokens || 0) / 1000) * 0.002, // $0.002 per 1K tokens (GPT-4 estimate)
    };
  }
}
