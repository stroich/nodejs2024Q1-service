import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';

export class FavsService {
  protected favs = {
    artists: [],
    albums: [],
    tracks: [],
  };

  getFavs() {
    return this.favs;
  }

  addEnityInArtists(entity: Artist) {
    this.favs.artists.push(entity);
  }

  addEnityInAlbums(entity: Album) {
    this.favs.albums.push(entity);
  }

  addEnityInTracks(entity: Track) {
    this.favs.tracks.push(entity);
  }

  removeFavInArtists(id: string) {
    const trackIndex = this.favs.artists.findIndex((user) => user.id === id);
    if (trackIndex === -1) {
      return undefined;
    } else {
      return this.favs.artists.splice(trackIndex, 1);
    }
  }

  removeFavInAlbums(id: string) {
    const trackIndex = this.favs.albums.findIndex((user) => user.id === id);
    if (trackIndex === -1) {
      return undefined;
    } else {
      return this.favs.albums.splice(trackIndex, 1);
    }
  }

  removeFavInTracks(id: string) {
    const trackIndex = this.favs.tracks.findIndex((user) => user.id === id);
    if (trackIndex === -1) {
      return undefined;
    } else {
      return this.favs.tracks.splice(trackIndex, 1);
    }
  }

  remove(opetation: string, id: string) {
    const actions = {
      track: () => {
        return this.removeFavInTracks(id);
      },
      album: () => {
        return this.removeFavInAlbums(id);
      },
      artist: () => {
        return this.removeFavInArtists(id);
      },
    };

    const action = actions[opetation];
    if (action) {
      return action();
    }
  }
}
