import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async validateUser(username: string, password: string): Promise<any | null> {
    const user = {
      id: 43,
      email: 'some',
      password: 'password',
    };
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
