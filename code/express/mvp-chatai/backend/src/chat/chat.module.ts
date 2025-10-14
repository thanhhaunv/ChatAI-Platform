import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { OpenAIService } from './agents/openai.service';
import { GeminiService } from './agents/gemini.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ConversationsModule } from '../conversations/conversations.module';

@Module({
  imports: [PrismaModule, ConversationsModule],
  controllers: [ChatController],
  providers: [ChatService, OpenAIService, GeminiService],
  exports: [
    ChatService,
    OpenAIService,
    GeminiService
  ]
    ,
})
export class ChatModule {}
