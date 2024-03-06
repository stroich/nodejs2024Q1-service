import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private users: Array<User> = [];

  create(createUserDto: CreateUserDto) {
    const newUser: User = {
      id: uuidv4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(newUser);
    const userWithoutPassword = { ...newUser };
    delete userWithoutPassword.password;
    return userWithoutPassword;
  }

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  updatePassword(id: string, updateUserDto: UpdateUserDto) {
    const user = this.findOne(id);
    user.password = updateUserDto.newPassword;
    return user;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
