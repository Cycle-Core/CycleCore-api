// src/core/auth/auth.controller.ts
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from '../users/dto/register-user.dto';
import { LoginDto } from '../users/dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterUserDto) {
    return this.authService.register(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout() {
    return this.authService.logout();
  }
}
