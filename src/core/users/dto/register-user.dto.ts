// src/core/users/dto/register-user.dto.ts
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  @MaxLength(120)
  email: string;

  @IsString()
  @MinLength(3)
  @MaxLength(60)
  @Matches(/^[a-zA-Z0-9_.-]+$/, {
    message:
      'username can only contain letters, numbers, dots, underscores and hyphens',
  })
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(72)
  // at least 1 upper, lower, number
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
    message:
      'password must contain at least one uppercase letter, one lowercase letter and one number',
  })
  password: string;

  @IsString()
  @MinLength(8)
  @MaxLength(72)
  confirmPassword: string;
}
