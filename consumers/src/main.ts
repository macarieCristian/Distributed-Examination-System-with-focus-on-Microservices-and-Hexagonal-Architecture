import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 9050,
        retryAttempts: 3,
        retryDelay: 3000,
      },
    });
  await app.listenAsync();
  Logger.log(
    'Consumers Service:- started on port: 9050',
  );
}

bootstrap();
