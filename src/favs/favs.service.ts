import { Inject, Injectable } from '@nestjs/common';
import { DataBase } from 'src/database/dataBase';

@Injectable()
export class FavsService {
  constructor(@Inject(DataBase) private dataBase: DataBase) {}

  findAll() {
    return this.dataBase.favsService.getFavs();
  }

  create(opetation: string, id: string) {
    const actions = {
      track: () => {
        const fav = this.dataBase.trackService.findOne(id);
        if (fav) {
          this.dataBase.favsService.addEnityInTracks(fav);
        }
        return fav;
      },
      album: () => {
        const fav = this.dataBase.albumService.findOne(id);
        if (fav) {
          this.dataBase.favsService.addEnityInAlbums(fav);
        }
        return fav;
      },
      artist: () => {
        const fav = this.dataBase.artistService.findOne(id);
        if (fav) {
          this.dataBase.favsService.addEnityInArtists(fav);
        }
        return fav;
      },
    };

    const action = actions[opetation];
    if (action) {
      return action();
    }
  }

  remove(opetation: string, id: string) {
    return this.dataBase.favsService.remove(opetation, id);
  }
}
