import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategy/jwt.strategy';
import { GithubStrategy } from './strategy/github.strategy';
import { JwtService } from '@nestjs/jwt';
import { LocalStrategy } from './strategy/local.strategy';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [PassportModule],
  providers: [
    JwtStrategy,
    AuthService,
    JwtService,
    LocalStrategy,
    GithubStrategy,
    UserService,
    PrismaService,
  ],
  controllers: [AuthController],
  exports: [PassportModule, JwtStrategy, LocalStrategy, GithubStrategy],
})
export class AuthModule {}
