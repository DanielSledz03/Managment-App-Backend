import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { WorkScheduleService } from './work-schedule.service';
import { CreateWorkScheduleDto } from './dto/create-work-schedule.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Work Schedule')
@Controller('work-schedule')
export class WorkScheduleController {
  constructor(private readonly workScheduleService: WorkScheduleService) {}

  @Post('create')
  async createWorkSchedule(
    @Body() createWorkScheduleDto: CreateWorkScheduleDto,
  ) {
    try {
      return await this.workScheduleService.createWorkSchedule(
        createWorkScheduleDto,
      );
    } catch (error) {
      return error;
    }
  }

  @Get()
  async getAllWorkSchedules() {
    try {
      return await this.workScheduleService.getAllWorkSchedules();
    } catch (error) {
      return error;
    }
  }

  @Get('/this-month/:userId')
  async getWorkScheduleThisMonth(
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    try {
      return await this.workScheduleService.getWorkScheduleThisMonth(userId);
    } catch (error) {
      return error;
    }
  }

  @Get('/:date')
  async getWorkScheduleByDate(@Param('date') date: string) {
    try {
      return await this.workScheduleService.getWorkScheduleByDate(date);
    } catch (error) {
      return error;
    }
  }
}
