import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Service } from '../domain/enum/service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exam } from '../domain/exam.entity';
import { ExamQuestion } from '../domain/exam-question.entity';
import { Question } from '../domain/question.entity';
import { Answer } from '../domain/answer.entity';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: Service.GATEWAY,
        transport: Transport.TCP,
        options: {
          host: 'gateway',
          port: 9010,
        },
      },
    ]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgresProviders',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'providers',
      entities: [Exam, ExamQuestion, Question, Answer],
      synchronize: true,
      // logging: true,
    }),
  ],
  exports: [ClientsModule, TypeOrmModule],
})
export class SharedModule {
}
