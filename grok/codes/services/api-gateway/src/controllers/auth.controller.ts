import { Controller, Get, Post, Body, Req, Res } from '@nestjs/common';
// Assume HttpService for proxy
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(private httpService: HttpService) {}

  @Post('login')
  async login(@Body() body: any, @Req() req, @Res() res) {
    // Proxy to auth-service
    const response = await lastValueFrom(
      this.httpService.post('http://auth-service:3001/auth/login', body),
    );
    res.status(response.status).json(response.data);
  }

  // Add similar for signup, oauth, etc.
}
