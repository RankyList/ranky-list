import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import helmet from '@fastify/helmet';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { CrudConfigService } from '@nestjsx/crud';

CrudConfigService.load({
  query: {
    limit: 25,
    maxLimit: 100,
    cache: 2000,
    alwaysPaginate: true
  },
  routes: {
    exclude: ['createManyBase', 'replaceOneBase']
  }
});

// This is required for the load function above to take effect, see https://github.com/nestjsx/crud/wiki/Controllers#global-options
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  const config = new DocumentBuilder()
    .setTitle('RankyList API')
    .setDescription('The RankyList API.')
    .setVersion('1.0')
    .addTag('tier-lists')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  // This will intercept all responses and exclude fields marked with the @Exclude decorator. We can improve that later if we need more functionalities.
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.register(helmet);

  await app.listen(3000, '0.0.0.0');
}

bootstrap();
