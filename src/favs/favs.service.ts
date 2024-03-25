import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class FavsService {
  constructor(private readonly dataBase: PrismaService) {}

  async createEmptyFavs() {
    const favorites = await this.dataBase.favorites.findUnique({
      where: { id: 'favs' },
    });
    if (!favorites) {
      await this.dataBase.favorites.create({
        data: { id: 'favs' },
      });
    }
  }

  async findAll() {
    await this.createEmptyFavs();
    const favs = await this.dataBase.favorites.findUnique({
      where: { id: 'favs' },
      select: {
        artists: {
          select: {
            id: true,
            name: true,
            grammy: true,
          },
        },
        albums: {
          select: {
            id: true,
            name: true,
            year: true,
            artistId: true,
          },
        },
        tracks: {
          select: {
            id: true,
            name: true,
            duration: true,
            albumId: true,
            artistId: true,
          },
        },
      },
    });
    return favs;
  }

  async create(opetation: string, id: string) {
    await this.createEmptyFavs();
    const actions = {
      track: async () => {
        const fav = await this.dataBase.track.findUnique({ where: { id } });
        if (fav) {
          await this.dataBase.track.update({
            where: { id },
            data: { favoritesId: 'favs' },
          });
        }
        return fav;
      },
      album: async () => {
        const fav = await this.dataBase.album.findUnique({ where: { id } });
        if (fav) {
          await this.dataBase.album.update({
            where: { id },
            data: { favoritesId: 'favs' },
          });
        }
        return fav;
      },
      artist: async () => {
        const fav = await this.dataBase.artist.findUnique({ where: { id } });
        if (fav) {
          await this.dataBase.artist.update({
            where: { id },
            data: { favoritesId: 'favs' },
          });
        }
        return fav;
      },
    };

    const action = await actions[opetation];
    if (action) {
      return await action();
    }
  }

  async remove(opetation: string, id: string) {
    const actions = {
      track: async () => {
        return await this.dataBase.track.update({
          where: { id },
          data: { favoritesId: null },
        });
      },
      album: async () => {
        return await this.dataBase.album.update({
          where: { id },
          data: { favoritesId: null },
        });
      },
      artist: async () => {
        return await this.dataBase.artist.update({
          where: { id },
          data: { favoritesId: null },
        });
      },
    };

    const action = await actions[opetation];
    if (action) {
      return await action();
    }
  }
}
