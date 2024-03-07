import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  private tracks: Array<Track> = [];

  create(createTrackDto: CreateTrackDto) {
    const newTrack: Track = {
      id: uuidv4(),
      name: createTrackDto.name,
      artistId: 'artistId' in createTrackDto ? createTrackDto.artistId : null,
      albumId: 'albumId' in createTrackDto ? createTrackDto.albumId : null,
      duration: createTrackDto.duration,
    };
    this.tracks.push(newTrack);
    return newTrack;
  }

  findAll() {
    return this.tracks;
  }

  findOne(id: string) {
    return this.tracks.find((track) => track.id === id);
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

  remove(id: string) {
    const trackIndex = this.tracks.findIndex((user) => user.id === id);

    if (trackIndex === -1) {
      return undefined;
    }
    if (trackIndex) {
      return this.tracks.splice(trackIndex, 1);
    }
  }
}
