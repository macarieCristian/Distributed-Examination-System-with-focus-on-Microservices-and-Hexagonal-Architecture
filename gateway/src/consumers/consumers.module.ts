import { Module } from '@nestjs/common';
import { ConsumersService } from './core/consumers.service';
import { ConsumersController } from './port/incoming/consumers.controller';
import { ConsumersRemoteService } from './port/outgoing/consumers-remote.service';
import { ExamAnswersConsumersController } from './port/incoming/exam-answers-consumers.controller';

@Module({
  providers: [ConsumersService, ConsumersRemoteService],
  controllers: [ConsumersController, ExamAnswersConsumersController]
})
export class ConsumersModule {}
