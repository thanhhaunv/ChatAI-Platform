'use client';

import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Bot, User } from 'lucide-react';
import TTSPlayer from './TTSPlayer';

interface Message {
  id: number;
  content: string;
  role: 'user' | 'assistant' | 'system';
  createdAt?: string;
  user?: { name: string };
  agent?: { name: string };
}

interface Props {
  messages: Message[];
  streamingMessage?: string;
}

export default function MessageList({ messages, streamingMessage }: Props) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingMessage]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex gap-3 ${
            message.role === 'user' ? 'justify-end' : 'justify-start'
          }`}
        >
          {message.role === 'assistant' && (
            <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <Bot size={18} className="text-white" />
            </div>
          )}

          <div
            className={`max-w-[70%] rounded-lg px-4 py-2 ${
              message.role === 'user'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-900'
            }`}
          >
            {message.role === 'assistant' ? (
              <div className="prose prose-sm max-w-none">
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            ) : (
              <p className="whitespace-pre-wrap">{message.content}</p>
            )}
            
            <div className="flex items-center justify-between mt-1">
              {message.createdAt && (
                <p className={`text-xs ${
                  message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {new Date(message.createdAt).toLocaleTimeString()}
                </p>
              )}
              
              {/* TTS button for assistant messages */}
              {message.role === 'assistant' && (
                <TTSPlayer text={message.content} />
              )}
            </div>
          </div>

          {message.role === 'user' && (
            <div className="flex-shrink-0 w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
              <User size={18} className="text-white" />
            </div>
          )}
        </div>
      ))}

      {/* Streaming message */}
      {streamingMessage && (
        <div className="flex gap-3 justify-start">
          <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <Bot size={18} className="text-white" />
          </div>
          <div className="max-w-[70%] rounded-lg px-4 py-2 bg-gray-100 text-gray-900">
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown>{streamingMessage}</ReactMarkdown>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}
