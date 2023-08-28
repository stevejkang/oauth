import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getOK(): string {
    return 'OK';
  }
}
