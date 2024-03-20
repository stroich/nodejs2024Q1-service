import {
  Controller,
  Post,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  UnprocessableEntityException,
  NotFoundException,
  Get,
  ParseEnumPipe,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsEntity } from './fav.type';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  async findAll() {
    return this.favsService.findAll();
  }

  @Post(':operation/:id')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('operation', new ParseEnumPipe(FavsEntity)) operation: string,
  ) {
    const track = await this.favsService.create(operation, id);
    if (!track) {
      throw new UnprocessableEntityException(`${operation} not found`);
    }
    return track;
  }

  @Delete(':operation/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('operation', new ParseEnumPipe(FavsEntity)) operation: string,
  ) {
    const track = await this.favsService.remove(operation, id);
    if (!track) {
      throw new NotFoundException(`${operation} not found`);
    }
    return track;
  }
}
