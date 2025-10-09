import { Controller, Post, Body, Param, Req, Res } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Controller('chat')
export class ChatController {
  constructor(private readonly httpService: HttpService) {}

  @Post(':projectId/:threadId')
  async sendMessage(
    @Param() params: { projectId: string; threadId: string },
    @Body() body: any,
    @Req() req: any,
    @Res() res: any,
  ) {
    try {
      const response = await lastValueFrom(
        this.httpService.post(
          `${process.env.CHAT_ORCH_URL}/chat/${params.projectId}/${params.threadId}`,
          body,
          { headers: req.headers },
        ),
      );
      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(500).json({ message: 'Failed to proxy to chat-orch' });
    }
  }
}
