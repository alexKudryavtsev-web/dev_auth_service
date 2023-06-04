import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
import { GithubProfile } from 'src/auth/types/githubProfile.type';
import { CreateUserDto } from './dto/createUser.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllUsers(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: await hash(createUserDto.password, 10),
      },
    });
  }

  async createGithubUser(profile: GithubProfile): Promise<User> {
    return await this.prisma.user.create({
      data: {
        gitHubId: Number(profile.id),
        name: profile.displayName,
        location: profile._json.location,
      },
    });
  }

  async getUserByGithubId(gitHubId: number): Promise<User> {
    return await this.prisma.user.findUnique({
      where: {
        gitHubId,
      },
    });
  }

  async getUserByEmail(email: string): Promise<User & { password?: string }> {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
