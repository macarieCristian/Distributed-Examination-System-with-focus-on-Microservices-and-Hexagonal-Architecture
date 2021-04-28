import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamAnswer } from '../domain/exam.entity';
import { ExamsService } from './core/exams.service';
import { ExamsController } from './port/incoming/exams.controller';
import { ExamsGatewayRemoteService } from './port/outgoing/exams-gateway-remote.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExamAnswer])],
  providers: [ExamsService, ExamsGatewayRemoteService],
  controllers: [ExamsController]
})
export class ExamsModule {}
