import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { BaseService } from 'src/shared/BaseService';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class AlbumService extends BaseService<Album> {
  constructor(@Inject(TrackService) private trackService: TrackService) {
    super();
  }

  changeArtistIdToNull(artistId: string): void {
    this.entities.forEach((album) => {
      if (album.artistId === artistId) {
        album.artistId = null;
      }
    });
  }

  create(createAlbumDto: CreateAlbumDto) {
    const newAlbum: Album = {
      id: uuidv4(),
      name: createAlbumDto.name,
      artistId: 'artistId' in createAlbumDto ? createAlbumDto.artistId : null,
      year: createAlbumDto.year,
    };
    this.entities.push(newAlbum);
    return newAlbum;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.findOne(id);

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

  removeFromTrack(id: string) {
    const album = this.remove(id);
    if (album) {
      this.trackService.changeAlbumIdToNull(id);
    }
    return album;
  }
}
