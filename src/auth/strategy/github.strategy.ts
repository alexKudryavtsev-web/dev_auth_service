import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github';
import { UserService } from 'src/user/user.service';
import { GithubProfile } from '../types/githubProfile.type';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private readonly userService: UserService) {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${process.env.API_URL}/auth/github/callback`,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: GithubProfile,
    done: any,
  ) {
    const candidate = await this.userService.getUserByGithubId(
      Number(profile.id),
    );
    if (candidate) {
      done(null, candidate);
    } else {
      const newUser = await this.userService.createGithubUser(profile);
      done(null, newUser);
    }
  }
}
