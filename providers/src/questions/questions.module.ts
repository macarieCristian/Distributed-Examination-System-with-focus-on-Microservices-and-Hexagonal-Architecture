import { Module } from '@nestjs/common';
import { QuestionsService } from './core/questions.service';
import { QuestionsGatewayRemoteService } from './port/outgoing/questions-gateway-remote.service';
import { QuestionsController } from './port/incoming/questions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from '../domain/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question])],
  controllers: [QuestionsController],
  providers: [QuestionsService, QuestionsGatewayRemoteService],
})
export class QuestionsModule {
}
