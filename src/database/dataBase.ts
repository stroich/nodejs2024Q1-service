import { Album } from 'src/album/entities/album.entity';
import { BaseService } from './BaseService';
import { Artist } from 'src/artist/entities/artist.entity';
import { User } from 'src/user/entities/user.entity';
import { Track } from 'src/track/entities/track.entity';
import { Injectable } from '@nestjs/common';
import { FavsService } from './FavsServise';

@Injectable()
export class DataBase {
  readonly albumService: BaseService<Album>;
  readonly artistService: BaseService<Artist>;
  readonly userService: BaseService<User>;
  readonly trackService: BaseService<Track>;
  readonly favsService: FavsService;

  constructor() {
    this.albumService = new BaseService<Album>();
    this.artistService = new BaseService<Artist>();
    this.userService = new BaseService<User>();
    this.trackService = new BaseService<Track>();
    this.favsService = new FavsService();
  }

  changeArtistIDInTruckservice(artistId: string): void {
    const tracks = this.trackService.findAll();
    tracks.forEach((track) => {
      if (track.artistId === artistId) {
        track.artistId = null;
      }
    });
  }

  changeAlbumIdInTruckservice(albumId: string): void {
    const tracks = this.trackService.findAll();
    tracks.forEach((track) => {
      if (track.albumId === albumId) {
        track.albumId = null;
      }
    });
  }

  changeArtistIDInAlbumservice(artistId: string): void {
    const albums = this.albumService.findAll();
    albums.forEach((album) => {
      if (album.artistId === artistId) {
        album.artistId = null;
      }
    });
  }
}
