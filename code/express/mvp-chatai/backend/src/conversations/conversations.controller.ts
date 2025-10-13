import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('projects/:projectId/conversations')
@UseGuards(JwtAuthGuard)
export class ConversationsController {
  constructor(private conversationsService: ConversationsService) {}

  @Post()
  async create(
    @Request() req,
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() createConversationDto: CreateConversationDto,
  ) {
    return this.conversationsService.create(projectId, req.user.id, createConversationDto);
  }

  @Get()
  async getProjectConversations(
    @Request() req,
    @Param('projectId', ParseIntPipe) projectId: number,
  ) {
    return this.conversationsService.getProjectConversations(projectId, req.user.id);
  }

  @Get('thread/:threadId')
  async getByThreadId(@Request() req, @Param('threadId') threadId: string) {
    return this.conversationsService.getByThreadId(threadId, req.user.id);
  }

  @Patch('thread/:threadId')
  async updateTitle(
    @Request() req,
    @Param('threadId') threadId: string,
    @Body('title') title: string,
  ) {
    return this.conversationsService.updateTitle(threadId, req.user.id, title);
  }

  @Delete('thread/:threadId')
  async delete(@Request() req, @Param('threadId') threadId: string) {
    return this.conversationsService.delete(threadId, req.user.id);
  }
}
