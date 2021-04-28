import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { QuestionsService } from '../../core/questions.service';
import { Request } from 'express';
import { QuestionDtoIn } from './dto/create-question/question-dto-in';
import { AuthorizationGuard } from '../../../auth/guards/authorization.guard';
import { Roles } from '../../../auth/decorator/roles.decorator';
import { UserRole } from '../../../domain/enum/user-role.enum';
import { QuestionDtoOut } from './dto/get-all-questions-by-user/question-dto-out';

@Controller('api/questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {
  }

  @UseGuards(AuthorizationGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  async getAllQuestionsByUser(@Req() request: Request): Promise<QuestionDtoOut[]> {
    return await this.questionsService.getAllQuestionsByUser(request['user'].uuid);
  }

  @UseGuards(AuthorizationGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  async createQuestion(@Req() request: Request, @Body() questionDtoIn: QuestionDtoIn) {
    await this.questionsService.createQuestion(
      request['user'].uuid,
      {
        ...questionDtoIn,
        ownerUuid: request['user'].uuid,
      });
  }


}
