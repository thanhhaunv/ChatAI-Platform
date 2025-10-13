import { Injectable, BadRequestException } from '@nestjs/common';
import axios from 'axios';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

@Injectable()
export class GeminiService {
  private apiKey: string;
  private baseUrl = 'https://generativelanguage.googleapis.com/v1beta';

  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY;
    if (!this.apiKey) {
      console.warn('⚠️  GEMINI_API_KEY not found (optional)');
    }
  }

  async chat(messages: Message[]): Promise<{
    content: string;
    tokens: number;
  }> {
    if (!this.apiKey) {
      throw new BadRequestException('Gemini API key not configured');
    }

    try {
      // Convert to Gemini format
      const contents = this.convertToGeminiFormat(messages);

      const response = await axios.post(
        `${this.baseUrl}/models/gemini-pro:generateContent?key=${this.apiKey}`,
        {
          contents: contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const content = response.data.candidates[0].content.parts[0].text;
      const tokens = response.data.usageMetadata?.totalTokenCount || 0;

      return {
        content,
        tokens,
      };
    } catch (error) {
      console.error('Gemini API Error:', error.response?.data || error.message);
      throw new BadRequestException(
        error.response?.data?.error?.message || 'Failed to call Gemini API',
      );
    }
  }

  private convertToGeminiFormat(messages: Message[]) {
    return messages
      .filter((msg) => msg.role !== 'system') // Gemini doesn't support system messages
      .map((msg) => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }],
      }));
  }
}
