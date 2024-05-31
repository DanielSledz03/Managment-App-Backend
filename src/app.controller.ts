import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';

@Controller()
export class AppController {
    constructor() {}
    @Get()
    throwError() {
        throw new HttpException('Test exception', HttpStatus.BAD_REQUEST);
    }
}
