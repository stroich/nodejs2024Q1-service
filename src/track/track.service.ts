import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { BaseService } from 'src/shared/BaseService';

@Injectable()
export class TrackService extends BaseService<Track> {
  create(createTrackDto: CreateTrackDto) {
    const newTrack: Track = {
      id: uuidv4(),
      name: createTrackDto.name,
      artistId: 'artistId' in createTrackDto ? createTrackDto.artistId : null,
      albumId: 'albumId' in createTrackDto ? createTrackDto.albumId : null,
      duration: createTrackDto.duration,
    };
    this.entities.push(newTrack);
    return newTrack;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.findOne(id);

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
}
