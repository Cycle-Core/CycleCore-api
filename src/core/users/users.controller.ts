// src/core/users/users.controller.ts
import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Req() req: any) {
    const userId = req.user.sub;
    const user = await this.usersService.findById(userId);

    // don’t return passwordHash
    const { passwordHash, ...safeUser } = user;
    return safeUser;
  }
}
