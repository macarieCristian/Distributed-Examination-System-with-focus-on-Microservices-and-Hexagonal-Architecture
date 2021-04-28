import { ArgumentsHost, Catch, ForbiddenException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class CSRFExceptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    if (exception.code === 'EBADCSRFTOKEN') {
      super.catch(new ForbiddenException('CSRF token mismatch'), host);
    } else {
      super.catch(exception, host);
    }
  }
}
