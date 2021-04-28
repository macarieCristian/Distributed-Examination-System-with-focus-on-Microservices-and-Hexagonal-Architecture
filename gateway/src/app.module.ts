import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './users/users.module';
import { QuestionsModule } from './questions/questions.module';
import { ExamsModule } from './exams/exams.module';
import { ConsumersModule } from './consumers/consumers.module';

@Module({
  imports: [
    AuthModule,
    SharedModule,
    UsersModule,
    QuestionsModule,
    ExamsModule,
    ConsumersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
