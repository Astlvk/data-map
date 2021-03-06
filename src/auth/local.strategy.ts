import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(name: string, password: string): Promise<User> {
    try {
      const user = await this.authService.validateUser(name, password);
      if (!user) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
}
