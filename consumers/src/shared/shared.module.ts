import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamAnswer } from '../domain/exam.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Service } from '../domain/enums/service';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: Service.GATEWAY,
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 9010,
        },
      },
    ]),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'consumers',
      entities: [ExamAnswer],
      synchronize: true,
      logging: true,
      useUnifiedTopology: true,
    }),
  ],
  exports: [ClientsModule, TypeOrmModule],
})
export class SharedModule {
}
