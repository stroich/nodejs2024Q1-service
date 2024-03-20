import { Controller, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async clear() {
    await this.appService.clear();
  }
}
