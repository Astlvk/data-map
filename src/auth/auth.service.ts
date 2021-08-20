import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(name: string, password: string): Promise<User | null> {
    try {
      const user = await this.userService.findOneByName(name);
      if (user && user.password === password) {
        return user;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}
