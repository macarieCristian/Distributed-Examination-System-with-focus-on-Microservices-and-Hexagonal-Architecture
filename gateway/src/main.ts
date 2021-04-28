import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';
import { AuthenticatedSocketIoAdapter } from './shared/adapter/authenticated-socket-io.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:4200'],
    credentials: true
  });
  app.use(cookieParser());
  app.use(csurf({ cookie: true }));
  app.useWebSocketAdapter(new AuthenticatedSocketIoAdapter(app));


  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 9010,
      retryAttempts: 3,
      retryDelay: 3000,
    },
  });

  await app.startAllMicroservicesAsync();
  await app.listen(9000);
  Logger.log(
    'Gateway Service:- started http server on port: 9000 and microservice on port 9010',
  );
}

bootstrap();
