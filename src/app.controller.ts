import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { UserDecorator } from './user/decorators/user.decorator';

@Controller('app')
@ApiTags('app')
export class AppController {
  @ApiOperation({ summary: 'test jwt auth' })
  @ApiBearerAuth()
  @Get('jwt')
  @UseGuards(AuthGuard(['jwt']))
  async testJWT(@UserDecorator() user: User) {
    return user;
  }

  @ApiOperation({ summary: 'test github auth' })
  @Get('github')
  @UseGuards(AuthGuard('github'))
  async testGithub(@UserDecorator() user: User) {
    return user;
  }
}
