import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthorizationGuard } from '../../../auth/guards/authorization.guard';
import { Roles } from '../../../auth/decorator/roles.decorator';
import { UserRole } from '../../../domain/enum/user-role.enum';
import { ExamsService } from '../../core/exams.service';
import { ExamDtoIn } from './dto/create-exam/exam-dto-in';
import { ExamDtoOut } from './dto/get-all-exams-by-user/exam-dto-out';
import { GetConsumerAvailableExamDto } from '../outgoing/dto/get-consumer-available-exam/get-consumer-available-exam-dto';
import { GetConsumerAvailableExamHeaderDto } from '../outgoing/dto/get-consumer-available-exam-header/get-consumer-available-exam-header-dto';

@Controller('api/exams')
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {
  }

  @UseGuards(AuthorizationGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  async getAllExamsByUser(@Req() request: Request): Promise<ExamDtoOut[]> {
    return await this.examsService.getAllExamsByUser(request['user'].uuid) as ExamDtoOut[];
  }

  @UseGuards(AuthorizationGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  async createExam(@Req() request: Request, @Body() examDtoIn: ExamDtoIn) {
    await this.examsService.createExam(
      request['user'].uuid,
      {
        ...examDtoIn,
        ownerUuid: request['user'].uuid,
      });
  }

  @UseGuards(AuthorizationGuard)
  @Get('/headers')
  async getConsumerAvailableExamsHeader(): Promise<GetConsumerAvailableExamHeaderDto[]> {
    return await this.examsService.getConsumerAvailableExamsHeader();
  }

  @UseGuards(AuthorizationGuard)
  @Get('/active-exam/:examUuid')
  async getConsumerAvailableExam(@Param('examUuid') examUuid: string): Promise<GetConsumerAvailableExamDto> {
    return await this.examsService.getConsumerAvailableExam(examUuid);
  }

}
