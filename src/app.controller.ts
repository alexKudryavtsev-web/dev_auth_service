import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('app')
export class AppController {
  @Get('jwt')
  @UseGuards(AuthGuard(['jwt']))
  async testJWT() {
    return "I'm JWT user";
  }

  @Get('github')
  @UseGuards(AuthGuard('github'))
  async testGithub() {
    return "I'm Github user";
  }
}
