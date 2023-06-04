import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('refresh')
  @UseGuards(AuthGuard('jwt'))
  refresh(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('github')
  @UseGuards(AuthGuard('github'))
  async githubLogin() {}

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async githubLoginCallback(@Request() req) {
    return req.user;
  }
}
