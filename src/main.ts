import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
dotenv.config();

const PORT = process.env.PORT;

const SWAGGER_CONFIG = new DocumentBuilder()
  .setTitle('Home library')
  .setDescription('Home library service api')
  .setVersion('1.0')
  .addTag('Home Library')
  .build();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const document = SwaggerModule.createDocument(app, SWAGGER_CONFIG);
  SwaggerModule.setup('api', app, document);
  await app.listen(PORT);
  console.log(PORT);
}
bootstrap();
