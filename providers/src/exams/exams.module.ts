import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exam } from '../domain/exam.entity';
import { ExamsController } from './port/incoming/exams.controller';
import { ExamsService } from './core/exams.service';
import { ExamsGatewayRemoteService } from './port/outgoing/exams-gateway-remote.service';

@Module({
  imports: [TypeOrmModule.forFeature([Exam])],
  controllers: [ExamsController],
  providers: [ExamsService, ExamsGatewayRemoteService],
})
export class ExamsModule {
}
