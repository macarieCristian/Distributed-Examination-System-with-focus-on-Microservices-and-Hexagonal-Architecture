import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { QuestionsModule } from './questions/questions.module';
import { ExamsModule } from './exams/exams.module';

@Module({
  imports: [SharedModule, QuestionsModule, ExamsModule],
  controllers: [],
  providers: [],
})
export class AppModule {
}
