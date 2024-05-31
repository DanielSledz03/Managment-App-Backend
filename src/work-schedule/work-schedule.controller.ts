import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    BadRequestException,
    InternalServerErrorException,
} from '@nestjs/common';
import { WorkScheduleService } from './work-schedule.service';
import { CreateWorkScheduleDto } from './dto/create-work-schedule.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Work Schedule')
@Controller('work-schedule')
export class WorkScheduleController {
    constructor(private readonly workScheduleService: WorkScheduleService) {}

    @Post('create')
    @ApiOperation({ summary: 'Create a new work schedule' })
    @ApiResponse({
        status: 201,
        description: 'The work schedule has been successfully created.',
    })
    @ApiResponse({ status: 400, description: 'Invalid input data.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    async createWorkSchedule(
        @Body() createWorkScheduleDto: CreateWorkScheduleDto,
    ) {
        try {
            return await this.workScheduleService.createWorkSchedule(
                createWorkScheduleDto,
            );
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new BadRequestException('Invalid input data.');
            } else {
                throw new InternalServerErrorException(
                    'Internal server error.',
                );
            }
        }
    }

    @Get()
    @ApiOperation({ summary: 'Get all work schedules' })
    @ApiResponse({ status: 200, description: 'Return all work schedules.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    async getAllWorkSchedules() {
        try {
            return await this.workScheduleService.getAllWorkSchedules();
        } catch (error) {
            throw new InternalServerErrorException('Internal server error.');
        }
    }

    @Get('this-month/:userId')
    @ApiOperation({ summary: 'Get work schedule for this month by user ID' })
    @ApiResponse({
        status: 200,
        description: 'Return the work schedule for this month.',
    })
    @ApiResponse({ status: 400, description: 'Invalid user ID.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    async getWorkScheduleThisMonth(
        @Param('userId', ParseIntPipe) userId: number,
    ) {
        try {
            return await this.workScheduleService.getWorkScheduleThisMonth(
                userId,
            );
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new BadRequestException('Invalid user ID.');
            } else {
                throw new InternalServerErrorException(
                    'Internal server error.',
                );
            }
        }
    }

    @Get(':date')
    @ApiOperation({ summary: 'Get work schedule by date' })
    @ApiResponse({
        status: 200,
        description: 'Return the work schedule for the given date.',
    })
    @ApiResponse({ status: 400, description: 'Invalid date format.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    async getWorkScheduleByDate(@Param('date') date: string) {
        try {
            return await this.workScheduleService.getWorkScheduleByDate(date);
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new BadRequestException('Invalid date format.');
            } else {
                throw new InternalServerErrorException(
                    'Internal server error.',
                );
            }
        }
    }
}
