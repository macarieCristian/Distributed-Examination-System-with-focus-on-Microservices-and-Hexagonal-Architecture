import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 9020,
        retryAttempts: 3,
        retryDelay: 3000,
      },
    },
  );

  await app.listenAsync();
  console.log('Auth Service:- started on port 9020');
}

bootstrap();
