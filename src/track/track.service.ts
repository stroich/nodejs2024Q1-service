import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DataBase } from 'src/database/dataBase';
import { FavsEntity } from 'src/favs/fav.type';
import { Track } from 'src/database/type';

@Injectable()
export class TrackService {
  constructor(@Inject(DataBase) private dataBase: DataBase) {}

  findAll() {
    return this.dataBase.trackService.findAll();
  }

  findOne(id: string) {
    return this.dataBase.trackService.findOne(id);
  }

  create(createTrackDto: CreateTrackDto) {
    const newTrack: Track = {
      id: uuidv4(),
      name: createTrackDto.name,
      artistId: 'artistId' in createTrackDto ? createTrackDto.artistId : null,
      albumId: 'albumId' in createTrackDto ? createTrackDto.albumId : null,
      duration: createTrackDto.duration,
    };
    this.dataBase.trackService.addEnity(newTrack);
    return newTrack;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.dataBase.trackService.findOne(id);

    if (!track) {
      return undefined;
    }
    if (track) {
      track.name = updateTrackDto.name;
      track.artistId =
        'artistId' in updateTrackDto ? updateTrackDto.artistId : null;
      track.albumId =
        'albumId' in updateTrackDto ? updateTrackDto.albumId : null;
      track.duration = updateTrackDto.duration;
      return track;
    }
  }

  remove(id: string) {
    const track = this.dataBase.trackService.remove(id);
    if (track) {
      this.dataBase.changeAlbumIdInTruckservice(id);
      this.dataBase.favsService.remove(FavsEntity.track, id);
    }
    return track;
  }
}
