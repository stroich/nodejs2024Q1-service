import { Inject, Injectable } from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { TrackService } from 'src/track/track.service';
import { Fav } from './entities/fav.entity';
import { Arr } from './fav.type';

@Injectable()
export class FavsService {
  private favs: Fav = {
    artists: [],
    albums: [],
    tracks: [],
  };

  constructor(
    @Inject(TrackService) private trackService: TrackService,
    @Inject(AlbumService) private albumService: AlbumService,
    @Inject(ArtistService) private artistService: ArtistService,
  ) {}

  findAll() {
    return this.favs;
  }

  create(opetation: string, id: string) {
    const actions = {
      track: () => {
        const fav = this.trackService.findOne(id);
        if (fav) {
          this.favs.tracks.push(fav);
        }
        return fav;
      },
      album: () => {
        const fav = this.albumService.findOne(id);
        if (fav) {
          this.favs.albums.push(fav);
        }
        return fav;
      },
      artist: () => {
        const fav = this.artistService.findOne(id);
        if (fav) {
          this.favs.artists.push(fav);
        }
        return fav;
      },
    };

    const action = actions[opetation];
    if (action) {
      return action();
    }
  }

  removeFav(arr: Arr, id: string) {
    const trackIndex = arr.findIndex((user) => user.id === id);
    if (trackIndex === -1) {
      return undefined;
    } else {
      return arr.splice(trackIndex, 1);
    }
  }

  remove(opetation: string, id: string) {
    const actions = {
      track: () => {
        return this.removeFav(this.favs.tracks, id);
      },
      album: () => {
        return this.removeFav(this.favs.albums, id);
      },
      artist: () => {
        return this.removeFav(this.favs.artists, id);
      },
    };

    const action = actions[opetation];
    if (action) {
      return action();
    }
  }
}
