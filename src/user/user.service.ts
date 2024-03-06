import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { omitPassword } from './omit';

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
    return omitPassword(newUser);
  }

  findAll() {
    const users = this.users.slice();
    return users.map((user) => omitPassword(user));
  }

  findOne(id: string) {
    const users = this.users.slice();
    const user = users.find((user) => user.id === id);
    if (user) {
      return omitPassword(user);
    }
  }

  updatePassword(id: string, updateUserDto: UpdateUserDto) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      return undefined;
    }
    if (user.password === updateUserDto.oldPassword) {
      user.password = updateUserDto.newPassword;
      user.version = user.version + 1;
      user.updatedAt = Date.now();
      return omitPassword(user);
    } else {
      return null;
    }
  }

  remove(id: string) {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return undefined;
    }
    if (userIndex) {
      const deleteUser = this.users.splice(userIndex, 1);
      return omitPassword(deleteUser[0]);
    }
  }
}
