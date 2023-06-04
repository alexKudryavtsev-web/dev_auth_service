import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(private jwtService: JwtService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  login(@Request() req) {
    const token = this.jwtService.sign(
      {
        userId: req.user.id,
      },
      {
        secret: process.env.JWT_SECRET,
      },
    );
    return { token };
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
