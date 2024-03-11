import { Module } from '@nestjs/common';
import { DataBase } from './dataBase';

@Module({
  providers: [DataBase],
  exports: [DataBase],
})
export class DatabaseModule {}
