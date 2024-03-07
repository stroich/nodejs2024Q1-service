import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { omitPassword } from './omit';
import { BaseService } from 'src/shared/BaseService';

@Injectable()
export class UserService extends BaseService<User> {
  create(createUserDto: CreateUserDto) {
    const newUser: User = {
      id: uuidv4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.entities.push(newUser);
    return omitPassword(newUser);
  }

  findAllWithoutPassport() {
    const users = this.entities.slice();
    return users.map((user) => omitPassword(user));
  }

  findOneWithoutPassport(id: string) {
    const users = this.entities.slice();
    const user = users.find((user) => user.id === id);
    if (user) {
      return omitPassword(user);
    }
  }

  updatePassword(id: string, updateUserDto: UpdateUserDto) {
    const user = this.entities.find((user) => user.id === id);

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
}
