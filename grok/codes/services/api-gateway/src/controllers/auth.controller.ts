import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(private readonly httpService: HttpService) {}

  @Post('login')
  async login(@Body() body: any, @Req() req: any, @Res() res: any) {
    try {
      const response = await lastValueFrom(
        this.httpService.post(`${process.env.AUTH_SERVICE_URL}/auth/login`, body, {
          headers: req.headers,
        }),
      );
      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(500).json({ message: 'Failed to proxy to auth-service' });
    }
  }

  @Post('signup')
  async signup(@Body() body: any, @Req() req: any, @Res() res: any) {
    try {
      const response = await lastValueFrom(
        this.httpService.post(`${process.env.AUTH_SERVICE_URL}/auth/signup`, body, {
          headers: req.headers,
        }),
      );
      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(500).json({ message: 'Failed to proxy to auth-service' });
    }
  }
}
