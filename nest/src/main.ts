import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import helmet from '@fastify/helmet';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  const config = new DocumentBuilder()
    .setTitle('RankyList API')
    .setDescription('The RankyList API.')
    .setVersion('1.0')
    .addTag('tier-list')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // This will intercept all responses and exclude fields marked with the @Exclude decorator. We can improve that later if we need more functionalities.
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.register(helmet);

  await app.listen(3000, '0.0.0.0');
}

bootstrap();
