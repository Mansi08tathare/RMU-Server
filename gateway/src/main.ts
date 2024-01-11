import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const server = express();
  dotenv.config();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  // Apply global pipes
  app.useGlobalPipes(new ValidationPipe());

  // Swagger configuration
  const options = new DocumentBuilder()
    .setTitle('RMU Server')
    .setDescription(' API Description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  // Start the application
  await app.listen(3000);
  console.log('Gateway is running on http://localhost:3000');
}

bootstrap()
  .catch((err) => console.error('Gateway initialization failed', err));
