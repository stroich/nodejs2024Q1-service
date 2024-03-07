import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { BaseService } from 'src/shared/BaseService';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService extends BaseService<Artist> {
  create(createArtistDto: CreateArtistDto) {
    const newArtist: Artist = {
      id: uuidv4(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    };
    this.entities.push(newArtist);
    return newArtist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this.findOne(id);

    if (!artist) {
      return undefined;
    }
    if (artist) {
      artist.name = updateArtistDto.name;
      artist.grammy = updateArtistDto.grammy;
      return artist;
    }
  }
}
