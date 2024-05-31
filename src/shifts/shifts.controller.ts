import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { ShiftsService } from './shifts.service';
import { CreateShiftDto } from './dto/create-shift.dto';
import { EditShiftDto } from './dto/edit-shift.dto';

@ApiTags('Shifts')
// @ApiBearerAuth()
// @UseGuards(JwtGuard, AdminGuard)
@Controller('shifts')
export class ShiftsController {
  constructor(private readonly shiftService: ShiftsService) {}

  @ApiOperation({ summary: 'Get all shifts.' })
  @ApiResponse({ status: 200, description: 'List of all shifts.' })
  @Get()
  async getShifts() {
    return await this.shiftService.getShifts();
  }

  @ApiOperation({ summary: 'Create a new shift.' })
  @ApiBody({ type: CreateShiftDto })
  @ApiResponse({ status: 201, description: 'Shift created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @Post('create')
  async createShift(@Body() createShiftDto: CreateShiftDto) {
    return await this.shiftService.createShift(createShiftDto);
  }

  @ApiOperation({ summary: 'Update an existing shift.' })
  @ApiBody({ type: EditShiftDto })
  @ApiResponse({ status: 200, description: 'Shift updated successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @Patch()
  async updateShift(@Body() editShiftDto: EditShiftDto) {
    return await this.shiftService.updateShift(editShiftDto);
  }

  @ApiOperation({ summary: 'Get all shifts for a specific user.' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'User ID',
    type: Number,
  })
  @ApiResponse({ status: 200, description: 'List of all shifts for the user.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @Get('/user-all-shifts/:id')
  async getUserAllShifts(@Param('id', ParseIntPipe) id: number) {
    return await this.shiftService.getUserAllShifts(id);
  }

  @ApiOperation({ summary: "Get today's shifts for a specific user." })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'User ID',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: "List of today's shifts for the user.",
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @Get('user-today-shifts/:id')
  async getUserTodayShifts(@Param('id', ParseIntPipe) id: number) {
    return await this.shiftService.getUserTodayShifts(id);
  }

  @ApiOperation({ summary: 'Get monthly shifts for a specific user.' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'User ID',
    type: Number,
  })
  @ApiParam({ name: 'year', required: true, description: 'Year', type: Number })
  @ApiParam({
    name: 'month',
    required: true,
    description: 'Month',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'List of monthly shifts for the user.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @Get('user-monthly-shifts/:id/:month/:year')
  async getUserMonthlyShifts(
    @Param('id', ParseIntPipe) id: number,
    @Param('year', ParseIntPipe) year: number,
    @Param('month', ParseIntPipe) month: number,
  ) {
    return await this.shiftService.getUserMonthlyShifts(id, year, month);
  }
}
