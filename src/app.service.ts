import { Injectable } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly dataBase: PrismaService) {}

  async clear() {
    await this.dataBase.user.deleteMany();
    await this.dataBase.album.deleteMany();
    await this.dataBase.track.deleteMany();
    await this.dataBase.artist.deleteMany();
    await this.dataBase.favorites.deleteMany();
  }
}
