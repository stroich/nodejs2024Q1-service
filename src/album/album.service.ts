import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { FavsEntity } from 'src/favs/fav.type';
import { DataBase } from 'src/database/dataBase';
import { Album } from 'src/database/type';

@Injectable()
export class AlbumService {
  constructor(@Inject(DataBase) private dataBase: DataBase) {}

  findAll() {
    return this.dataBase.albumService.findAll();
  }

  findOne(id: string) {
    return this.dataBase.albumService.findOne(id);
  }

  create(createAlbumDto: CreateAlbumDto) {
    const newAlbum: Album = {
      id: uuidv4(),
      name: createAlbumDto.name,
      artistId: 'artistId' in createAlbumDto ? createAlbumDto.artistId : null,
      year: createAlbumDto.year,
    };
    this.dataBase.albumService.addEnity(newAlbum);
    return newAlbum;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.dataBase.albumService.findOne(id);

    if (!album) {
      return undefined;
    }
    if (album) {
      album.name = updateAlbumDto.name;
      album.artistId =
        'artistId' in updateAlbumDto ? updateAlbumDto.artistId : null;
      album.year = updateAlbumDto.year;
      return album;
    }
  }

  remove(id: string) {
    const album = this.dataBase.albumService.remove(id);
    if (album) {
      this.dataBase.changeAlbumIdInTruckservice(id);
      this.dataBase.favsService.remove(FavsEntity.album, id);
    }
    return album;
  }
}
