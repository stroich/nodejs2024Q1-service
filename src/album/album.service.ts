import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private readonly dataBase: PrismaService) {}

  async findAll() {
    return this.dataBase.album.findMany();
  }

  async findOne(id: string) {
    return this.dataBase.album.findUnique({ where: { id } });
  }

  async create(createAlbumDto: CreateAlbumDto) {
    return this.dataBase.album.create({ data: createAlbumDto });
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.findOne(id);

    if (!album) {
      return undefined;
    }
    if (album) {
      return this.dataBase.album.update({
        where: { id },
        data: updateAlbumDto,
      });
    }
  }

  async remove(id: string) {
    const album = await this.findOne(id);
    if (album) {
      return await this.dataBase.album.delete({ where: { id } });
    }
    return album;
  }
}
