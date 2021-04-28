import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from '../../../auth/guards/authorization.guard';
import { ConsumersService } from '../../core/consumers.service';
import { Request } from 'express';
import { CreateExamAnswerDto } from './dto/create-exam-answer/create-exam-answer-dto';
import { GetAllUserExamAnswersByOwnerDto } from './dto/get-all-user-exam-answers-by-owner/get-all-user-exam-answers-by-owner-dto';
import { Roles } from '../../../auth/decorator/roles.decorator';
import { UserRole } from '../../../domain/enum/user-role.enum';

@Controller('api/consumers')
export class ConsumersController {
  constructor(private readonly consumersService: ConsumersService) {
  }

  @UseGuards(AuthorizationGuard)
  @Post('/exams/answer')
  async createExamAnswer(@Req() request: Request, @Body() createExamAnswerDtoIn: CreateExamAnswerDto) {
    await this.consumersService.createExamAnswer({
      ...createExamAnswerDtoIn,
      consumerUuid: request['user'].uuid,
      submittedAt: Date.now(),
    });
  }

  @UseGuards(AuthorizationGuard)
  @Roles(UserRole.ADMIN)
  @Get('/exams/answers')
  async getAllUserExamAnswersByOwner(@Req() request: Request): Promise<GetAllUserExamAnswersByOwnerDto> {
    return await this.consumersService.getAllUserExamAnswersByOwner(request['user'].uuid);
  }

}
