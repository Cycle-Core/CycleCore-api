// src/core/auth/auth.service.ts
import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from '../users/dto/register-user.dto';
import { LoginDto } from '../users/dto/login.dto';
import { User } from '../users/entities/user.entity';

export interface JwtPayload {
  sub: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterUserDto) {
    const user = await this.usersService.createUser(registerDto);
    const tokens = this.buildTokens(user);
    return {
      user: this.safeUser(user),
      ...tokens,
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.validateUserPassword(
      loginDto.identifier,
      loginDto.password,
    );

    if (!user) {
      // generic message so we don't leak if email/username exists
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = this.buildTokens(user);
    return {
      user: this.safeUser(user),
      ...tokens,
    };
  }

  async logout(): Promise<{ success: boolean }> {
    // With pure JWT, logout is handled client-side by discarding the token.
    // Later we can implement server-side token blacklisting/refresh tokens.
    return { success: true };
  }

  private buildTokens(user: User) {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '15m',
    });

    // For now: only access token. Later we can add refresh token logic.
    return { accessToken };
  }

  private safeUser(user: User) {
    const { passwordHash, ...rest } = user;
    return rest;
  }
}
