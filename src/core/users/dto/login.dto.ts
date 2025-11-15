// src/core/users/dto/login.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  // can be email OR username
  @IsString()
  @IsNotEmpty()
  identifier: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
