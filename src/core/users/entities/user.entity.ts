// src/core/users/entities/user.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Unique,
} from 'typeorm';

@Entity('users')
@Unique(['email'])
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 120 })
  email: string;

  @Column({ length: 60 })
  username: string;

  @Column()
  passwordHash: string;

  @Column({ default: false })
  isEmailVerified: boolean;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date | null;
}
