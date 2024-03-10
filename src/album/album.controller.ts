import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    const album = this.albumService.findOne(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const album = this.albumService.update(id, updateAlbumDto);
    if (album === undefined) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    const album = this.albumService.removeFromTrack(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }
}
