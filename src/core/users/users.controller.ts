// src/core/users/users.controller.ts
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Req() req: any) {
    const userId = req.user.userId;        // ✅ use userId, not sub
    const user = await this.usersService.findById(userId);

    const { passwordHash, ...safeUser } = user;
    return safeUser;
  }
}
