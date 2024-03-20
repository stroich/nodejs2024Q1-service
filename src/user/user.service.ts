import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { omitPassword } from './omit';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly dataBase: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.dataBase.user.create({
      data: createUserDto,
    });
    return omitPassword(newUser);
  }

  async findAllWithoutPassport() {
    const users = await this.dataBase.user.findMany();
    return users.map((user) => omitPassword(user));
  }

  async findOneWithoutPassport(id: string) {
    const user = await this.dataBase.user.findUnique({ where: { id } });
    if (user) {
      return omitPassword(user);
    }
    return user;
  }

  async updatePassword(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.dataBase.user.findUnique({ where: { id } });
    if (!user) {
      return undefined;
    }
    if (user.password === updateUserDto.oldPassword) {
      const upDateUser = await this.dataBase.user.update({
        where: { id },
        data: {
          password: updateUserDto.newPassword,
          version: { increment: 1 },
        },
      });
      return omitPassword(upDateUser);
    } else {
      return null;
    }
  }

  async remove(id: string) {
    try {
      return await this.dataBase.user.delete({ where: { id } });
    } catch (e) {
      return undefined;
    }
  }
}
