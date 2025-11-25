import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from './users.entity';
import { ICreateUser, IUpdateUser, IUser } from './users.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(user: ICreateUser): Promise<IUser> {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async findAllUsers(): Promise<IUser[]> {
    return this.userRepository.find({
      select: ['id', 'email', 'name', 'createdAt', 'articles'],
    });
  }

  async findUserByEmail(email: string): Promise<IUser | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findUserById(id: number): Promise<IUser | null> {
    return this.userRepository.findOne({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });
  }

  async updateUserById(id: number, user: IUpdateUser): Promise<UpdateResult> {
    return this.userRepository.update({ id }, user);
  }

  async deleteUserById(id: number): Promise<DeleteResult> {
    return this.userRepository.delete({ id });
  }
}
