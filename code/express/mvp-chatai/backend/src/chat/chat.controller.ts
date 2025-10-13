import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { SendMessageDto } from './dto/send-message.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('projects/:projectId/chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post('message')
  async sendMessage(
    @Request() req,
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() sendMessageDto: SendMessageDto,
  ) {
    return this.chatService.sendMessage(req.user.id, projectId, sendMessageDto);
  }

  @Get('thread/:threadId/history')
  async getMessageHistory(@Request() req, @Param('threadId') threadId: string) {
    return this.chatService.getMessageHistory(threadId, req.user.id);
  }

  @Get('thread/:threadId/usage')
  async getTokenUsage(@Request() req, @Param('threadId') threadId: string) {
    return this.chatService.getTokenUsage(threadId, req.user.id);
  }
}
