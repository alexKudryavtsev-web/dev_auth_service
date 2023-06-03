import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
import { GithubProfile } from 'src/auth/types/githubProfile.type';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllUsers(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  // async createUser(): Promise<User> {}

  async createGithubUser(profile: GithubProfile): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        gitHubId: Number(profile.id),
        name: profile.displayName,
        location: profile._json.location,
      },
    });

    return user;
  }

  async getUserByGithubId(gitHubId: number): Promise<User> {
    return await this.prisma.user.findUnique({
      where: {
        gitHubId,
      },
    });
  }
}
