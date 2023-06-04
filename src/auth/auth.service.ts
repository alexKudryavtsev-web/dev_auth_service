import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(email: string, password: string): Promise<any | null> {
    const user = await this.userService.getUserByEmail(email);

    if (user && compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }
}
