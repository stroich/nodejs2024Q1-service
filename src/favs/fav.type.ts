import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';

export enum FavsEntity {
  track = 'track',
  album = 'album',
  artist = 'artist',
}

export type Arr = Array<Album> | Array<Track> | Array<Artist>;
