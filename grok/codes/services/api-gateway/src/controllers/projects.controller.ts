import { Controller, Get, Post, Param, Body, Req, Res } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Controller('projects')
export class ProjectsController {
  constructor(private httpService: HttpService) {}

  @Get()
  async getProjects(@Req() req, @Res() res) {
    const response = await lastValueFrom(
      this.httpService.get('http://user-service:3002/projects', { headers: req.headers }),
    );
    res.status(response.status).json(response.data);
  }

  // Add create, update, etc.
}
