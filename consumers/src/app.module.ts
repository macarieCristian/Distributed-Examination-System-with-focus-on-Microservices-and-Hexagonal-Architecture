import { Module } from '@nestjs/common';
import { ExamsModule } from './exams/exams.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [ExamsModule, SharedModule],
  controllers: [],
  providers: [],
})
export class AppModule {
}
