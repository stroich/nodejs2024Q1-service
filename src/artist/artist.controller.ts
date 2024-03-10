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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    const artist = this.artistService.findOne(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const artist = this.artistService.update(id, updateArtistDto);
    if (artist === undefined) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    const artist = this.artistService.removeFromTrackAndAlmum(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }
}
