import { Controller, Post, Body, Param, Req, Res } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Controller('chat')
export class ChatController {
  constructor(private httpService: HttpService) {}

  @Post(':projectId/:threadId')
  async sendMessage(@Param() params: { projectId: string; threadId: string }, @Body() body: any, @Req() req, @Res() res) {
    const response = await lastValueFrom(
      this.httpService.post(`http://chat-orch:3003/chat/${params.projectId}/${params.threadId}`, body, { headers: req.headers }),
    );
    res.status(response.status).json(response.data);
  }
}
