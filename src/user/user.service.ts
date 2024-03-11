import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { omitPassword } from './omit';
import { DataBase } from 'src/database/dataBase';
import { User } from 'src/database/type';

@Injectable()
export class UserService {
  constructor(@Inject(DataBase) private dataBase: DataBase) {}

  create(createUserDto: CreateUserDto) {
    const newUser: User = {
      id: uuidv4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.dataBase.userService.addEnity(newUser);
    return omitPassword(newUser);
  }

  findAllWithoutPassport() {
    const users = this.dataBase.userService.findAll().slice();
    return users.map((user) => omitPassword(user));
  }

  findOneWithoutPassport(id: string) {
    const users = this.dataBase.userService.findAll().slice();
    const user = users.find((user) => user.id === id);
    if (user) {
      return omitPassword(user);
    }
  }

  updatePassword(id: string, updateUserDto: UpdateUserDto) {
    const user = this.dataBase.userService.findOne(id);

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
    return this.dataBase.userService.remove(id);
  }
}
