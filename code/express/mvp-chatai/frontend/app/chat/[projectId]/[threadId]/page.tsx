'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { chatApi } from '@/lib/api';
import { connectSocket, getSocket } from '@/lib/socket';
import MessageList from '@/components/MessageList';
import VoiceRecorder from '@/components/VoiceRecorder';
import FileUploader from '@/components/FileUploader';
import AttachmentDisplay from '@/components/AttachmentDisplay';
import { Send, ArrowLeft, DollarSign } from 'lucide-react';

interface Message {
  id: number;
  content: string;
  role: 'user' | 'assistant' | 'system';
  createdAt: string;
  tokens?: number;
  user?: { id: number; name: string };
  agent?: { id: number; name: string; type: string };
}

interface Conversation {
  id: number;
  threadId: string;
  title: string;
}

interface UploadedFile {
  filename: string;
  mimetype: string;
  size: number;
  extractedText: string;
  previewText: string;
}

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = parseInt(params.projectId as string);
  const threadId = params.threadId as string;

  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [streamingMessage, setStreamingMessage] = useState('');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [agentId] = useState(1); // Default to GPT-4
  const [attachments, setAttachments] = useState<UploadedFile[]>([]);
  const [usage, setUsage] = useState({ totalTokens: 0, estimatedCost: 0 });

  const socketRef = useRef<any>(null);

  useEffect(() => {
    loadChatHistory();
    loadUsage();
    setupWebSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.emit('leave_thread', { threadId });
      }
    };
  }, [threadId]);

  const loadChatHistory = async () => {
    try {
      const response = await chatApi.getHistory(projectId, threadId);
      setConversation(response.data.conversation);
      setMessages(response.data.messages);
    } catch (error) {
      console.error('Failed to load chat history:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadUsage = async () => {
    try {
      const response = await chatApi.getUsage(projectId, threadId);
      setUsage(response.data);
    } catch (error) {
      console.error('Failed to load usage:', error);
    }
  };

  const setupWebSocket = () => {
    try {
      const socket = connectSocket();
      socketRef.current = socket;

      socket.emit('join_thread', { threadId });

      socket.on('joined_thread', (data: any) => {
        console.log('✅ Joined thread:', data.threadId);
      });

      socket.on('new_message', (message: Message) => {
        setMessages((prev) => [...prev, message]);
      });

      socket.on('message_stream_start', () => {
        setStreamingMessage('');
      });

      socket.on('message_stream_chunk', (data: { content: string }) => {
        setStreamingMessage((prev) => prev + data.content);
      });

      socket.on('message_stream_end', (message: Message) => {
        setMessages((prev) => [...prev, message]);
        setStreamingMessage('');
        setSending(false);
        loadUsage();
      });

      socket.on('error', (error: any) => {
        console.error('WebSocket error:', error);
        alert(error.message);
        setSending(false);
      });
    } catch (error) {
      console.error('Failed to setup WebSocket:', error);
    }
  };

  const sendMessage = async () => {
    if ((!input.trim() && attachments.length === 0) || sending) return;

    const userMessage = input;
    const userAttachments = attachments;
    setInput('');
    setAttachments([]);
    setSending(true);

    // Add user message optimistically
    const tempMessage: Message = {
      id: Date.now(),
      content: userMessage,
      role: 'user',
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, tempMessage]);

    try {
      const socket = getSocket();
      if (socket?.connected) {
        // Send via WebSocket for streaming
        socket.emit('send_message', {
          threadId,
          content: userMessage,
          agentId,
          projectId,
          attachments: userAttachments.map((att) => ({
            filename: att.filename,
            extractedText: att.extractedText,
          })),
        });
      } else {
        // Fallback to REST API
        const response = await chatApi.sendMessage(projectId, {
          content: userMessage,
          agentId,
          threadId,
          attachments: userAttachments.map((att) => ({
            filename: att.filename,
            extractedText: att.extractedText,
          })),
        });
        setMessages((prev) => [
          ...prev.filter((m) => m.id !== tempMessage.id),
          response.data.userMessage,
          response.data.assistantMessage,
        ]);
        setSending(false);
        loadUsage();
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      alert('Failed to send message');
      setSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/projects')}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="font-semibold">{conversation?.title}</h1>
            <p className="text-xs text-gray-500">Thread ID: {threadId.slice(0, 8)}...</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1 text-gray-600">
            <DollarSign size={16} />
            <span>{usage.totalTokens.toLocaleString()} tokens</span>
          </div>
          <div className="text-gray-500">${usage.estimatedCost.toFixed(4)}</div>
        </div>
      </div>

      {/* Messages */}
      <MessageList messages={messages} streamingMessage={streamingMessage} />

      {/* Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Attachments preview */}
          {attachments.length > 0 && (
            <div className="mb-2 space-y-2">
              {attachments.map((att, index) => (
                <AttachmentDisplay
                  key={index}
                  attachment={att}
                  onRemove={() => setAttachments((prev) => prev.filter((_, i) => i !== index))}
                />
              ))}
            </div>
          )}

          <div className="flex gap-2">
            {/* File Upload */}
            <FileUploader
              onFileUploaded={(file) => setAttachments((prev) => [...prev, file])}
              disabled={sending}
            />

            {/* Voice Recorder */}
            <VoiceRecorder
              onTranscript={(text) => {
                setInput(text);
                setTimeout(() => {
                  if (text.trim()) {
                    sendMessage();
                  }
                }, 500);
              }}
              disabled={sending}
            />

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message, upload file, or use voice..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={1}
              disabled={sending}
              style={{ minHeight: '52px', maxHeight: '200px' }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = target.scrollHeight + 'px';
              }}
            />
            <button
              onClick={sendMessage}
              disabled={(!input.trim() && attachments.length === 0) || sending}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send size={18} />
              {sending ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
