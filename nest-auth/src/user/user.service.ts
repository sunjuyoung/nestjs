import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

/**
 * @InjectRepository User타입의 리포지토리를 주입합니다
 */

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  createUser(user): Promise<User> {
    return this.userRepository.save(user);
  }

  async getUserByEmail(email: string): Promise<User> {
    const result = await this.userRepository.findOne({ where: { email } });
    return result;
  }

  async updateUser(email: string, user) {
    const findUser: User = await this.getUserByEmail(email);
    findUser.username = user.username;
    findUser.password = user.password;
    this.userRepository.save(findUser);
  }

  async deleteUser(email: string) {
    return this.userRepository.delete({ email });
  }
}
