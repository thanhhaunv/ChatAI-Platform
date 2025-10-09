import { Controller, Get, Post, Param, Body, Req, Res } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly httpService: HttpService) {}

  @Get()
  async getProjects(@Req() req: any, @Res() res: any) {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`${process.env.USER_SERVICE_URL}/projects`, {
          headers: req.headers,
        }),
      );
      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(500).json({ message: 'Failed to proxy to user-service' });
    }
  }

  @Post()
  async createProject(@Body() body: any, @Req() req: any, @Res() res: any) {
    try {
      const response = await lastValueFrom(
        this.httpService.post(`${process.env.USER_SERVICE_URL}/projects`, body, {
          headers: req.headers,
        }),
      );
      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(500).json({ message: 'Failed to proxy to user-service' });
    }
  }
}
