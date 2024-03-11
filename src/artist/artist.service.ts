import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { FavsEntity } from 'src/favs/fav.type';
import { DataBase } from 'src/database/dataBase';

@Injectable()
export class ArtistService {
  constructor(@Inject(DataBase) private dataBase: DataBase) {}

  findAll() {
    return this.dataBase.artistService.findAll();
  }

  findOne(id: string) {
    return this.dataBase.artistService.findOne(id);
  }

  create(createArtistDto: CreateArtistDto) {
    const newArtist: Artist = {
      id: uuidv4(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    };
    this.dataBase.artistService.addEnity(newArtist);
    return newArtist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this.dataBase.artistService.findOne(id);

    if (!artist) {
      return undefined;
    }
    if (artist) {
      artist.name = updateArtistDto.name;
      artist.grammy = updateArtistDto.grammy;
      return artist;
    }
  }

  remove(id: string) {
    const artist = this.dataBase.artistService.remove(id);
    if (artist) {
      this.dataBase.changeArtistIDInTruckservice(id);
      this.dataBase.changeArtistIDInAlbumservice(id);
      this.dataBase.favsService.remove(FavsEntity.artist, id);
    }
    return artist;
  }
}
