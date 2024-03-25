import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private readonly dataBase: PrismaService) {}

  async findAll() {
    return this.dataBase.artist.findMany();
  }

  async findOne(id: string) {
    return this.dataBase.artist.findUnique({ where: { id } });
  }

  async create(createArtistDto: CreateArtistDto) {
    return this.dataBase.artist.create({ data: createArtistDto });
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.findOne(id);

    if (!artist) {
      return undefined;
    }
    if (artist) {
      return this.dataBase.artist.update({
        where: { id },
        data: updateArtistDto,
      });
    }
  }

  async remove(id: string) {
    const artist = await this.findOne(id);
    if (artist) {
      return await this.dataBase.artist.delete({ where: { id } });
    }
    return artist;
  }
}
