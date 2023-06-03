import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('jwt')
  @UseGuards(AuthGuard(['jwt']))
  getHello(): string {
    return "i'm jwt user";
  }

  @Get('github')
  @UseGuards(AuthGuard(['github']))
  getHelloGithub(): string {
    return "i'm github user";
  }
}
