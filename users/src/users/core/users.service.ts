import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../domain/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
  }

  async create(name: string, email: string, password: string) {
    await this.userRepository.save({
      name,
      email,
      password: await bcrypt.hash(password, 12),
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email });
  }
}
