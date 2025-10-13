import { Injectable, BadRequestException } from '@nestjs/common';
import axios from 'axios';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

@Injectable()
export class OpenAIService {
  private apiKey: string;
  private baseUrl = 'https://api.openai.com/v1';

  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY;
    if (!this.apiKey) {
      console.warn('⚠️  OPENAI_API_KEY not found in environment variables');
    }
  }

  async chat(messages: Message[], model: string = 'gpt-4'): Promise<{
    content: string;
    tokens: number;
  }> {
    if (!this.apiKey) {
      throw new BadRequestException('OpenAI API key not configured');
    }

    try {
      const response = await axios.post(
        `${this.baseUrl}/chat/completions`,
        {
          model: model,
          messages: messages,
          temperature: 0.7,
          max_tokens: 1000,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const content = response.data.choices[0].message.content;
      const tokens = response.data.usage.total_tokens;

      return {
        content,
        tokens,
      };
    } catch (error) {
      console.error('OpenAI API Error:', error.response?.data || error.message);
      throw new BadRequestException(
        error.response?.data?.error?.message || 'Failed to call OpenAI API',
      );
    }
  }

  // Stream chat (for WebSocket - Phase 6)
  async streamChat(messages: Message[], model: string = 'gpt-4') {
    if (!this.apiKey) {
      throw new BadRequestException('OpenAI API key not configured');
    }

    try {
      const response = await axios.post(
        `${this.baseUrl}/chat/completions`,
        {
          model: model,
          messages: messages,
          temperature: 0.7,
          max_tokens: 1000,
          stream: true,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          responseType: 'stream',
        },
      );

      return response.data;
    } catch (error) {
      console.error('OpenAI Stream Error:', error.response?.data || error.message);
      throw new BadRequestException('Failed to stream OpenAI response');
    }
  }
}
