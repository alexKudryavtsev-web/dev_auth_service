import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';

@Module({
  imports: [UserModule, AuthModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
