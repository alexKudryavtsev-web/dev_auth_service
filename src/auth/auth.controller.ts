import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'login by email and password' })
  @ApiBody({
    type: CreateUserDto,
  })
  @Post('login')
  @UseGuards(AuthGuard('local'))
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiOperation({ summary: 'refresh token' })
  @Post('refresh')
  @UseGuards(AuthGuard('jwt'))
  refresh(@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiOperation({ summary: 'login by github' })
  @Get('github')
  @UseGuards(AuthGuard('github'))
  async githubLogin() {}

  @ApiOperation({ summary: 'github callback' })
  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async githubLoginCallback(@Request() req) {
    return this.authService.login(req.user);
  }
}
