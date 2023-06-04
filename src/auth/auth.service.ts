import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any | null> {
    const user = await this.userService.getUserByEmail(email);

    if (user && compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: User) {
    const payload = { sub: user.id };

    return {
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
      }),
    };
  }
}
