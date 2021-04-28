import { Module } from '@nestjs/common';
import { QuestionsService } from './core/questions.service';
import { QuestionsRemoteService } from './port/outgoing/questions-remote.service';
import { QuestionsController } from './port/incoming/questions.controller';
import { QuestionsProvidersController } from './port/incoming/questions-providers.controller';

@Module({
  controllers: [QuestionsController, QuestionsProvidersController],
  providers: [QuestionsService, QuestionsRemoteService]
})
export class QuestionsModule {}
