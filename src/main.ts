import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as passport from 'passport';

async function bootstrap() {
  //NestJS setup
  const app = await NestFactory.create(AppModule);

  //Swagger config
  const config = new DocumentBuilder()
    .setTitle('FXF Managment API')
    .setDescription('The FXF Managment API description')
    .setVersion('1.0')
    .addTag('1.0.0')
    .addBearerAuth()
    .build();

  //Swagger setup
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //Validation setup
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.use(passport.initialize()); // Dodaj to!

  //Cors setup
  await app.listen(3000);
}
bootstrap();
