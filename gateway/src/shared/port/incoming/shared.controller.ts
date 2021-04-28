import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller()
export class SharedController {
  @Get()
  async getCSRFToken(@Req() request: Request,
                     @Res({ passthrough: true }) response: Response) {
    response.cookie('CSRF-TOKEN', request.csrfToken());
    response.status(HttpStatus.NO_CONTENT);
  }
}
