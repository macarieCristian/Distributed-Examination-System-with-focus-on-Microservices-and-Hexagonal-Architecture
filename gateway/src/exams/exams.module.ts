import { Module } from '@nestjs/common';
import { ExamsController } from './port/incoming/exams.controller';
import { ExamsService } from './core/exams.service';
import { ExamsProvidersController } from './port/incoming/exams-providers.controller';

@Module({
  controllers: [ExamsController, ExamsProvidersController],
  providers: [ExamsService],
})
export class ExamsModule {
}
