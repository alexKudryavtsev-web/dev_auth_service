import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User as UserModal } from '@prisma/client';
import { UserDecorator } from './user/decorators/user.decorator';

@Controller('app')
export class AppController {
  @Get('jwt')
  @UseGuards(AuthGuard(['jwt']))
  async testJWT(@UserDecorator() user: UserModal) {
    return user;
  }

  @Get('github')
  @UseGuards(AuthGuard('github'))
  async testGithub() {
    return "I'm Github user";
  }
}
