import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class TrackService {
  constructor(private readonly dataBase: PrismaService) {}

  async findAll(): Promise<Track[]> {
    return this.dataBase.track.findMany();
  }

  async findOne(id: string) {
    return this.dataBase.track.findUnique({ where: { id } });
  }

  async create(createTrackDto: CreateTrackDto) {
    return this.dataBase.track.create({ data: createTrackDto });
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.findOne(id);

    if (!track) {
      return undefined;
    }
    if (track) {
      return this.dataBase.track.update({
        where: { id },
        data: updateTrackDto,
      });
    }
  }

  async remove(id: string) {
    const track = await this.findOne(id);
    if (track) {
      return await this.dataBase.track.delete({ where: { id } });
    }
    return track;
  }
}
