import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ShiftsService } from './shifts.service';
import { CreateShiftDto } from './dto/create-shift.dto';
import { EditShiftDto } from './dto/edit-shift.dto';

@ApiTags('Shifts')
// @ApiBearerAuth()
// @UseGuards(JwtGuard, AdminGuard)
@Controller('shifts')
export class ShiftsController {
  constructor(private readonly shiftService: ShiftsService) {}

  @Get()
  async getShifts() {
    return await this.shiftService.getShifts();
  }

  @Post('create')
  async createShift(@Body() createShiftDto: CreateShiftDto) {
    return await this.shiftService.createShift(createShiftDto);
  }

  @Patch()
  async updateShift(@Body() editShiftDto: EditShiftDto) {
    return await this.shiftService.updateShift(editShiftDto);
  }

  @Get('/user-all-shifts/:id')
  async getUserAllShifts(@Param('id', ParseIntPipe) id: number) {
    return await this.shiftService.getUserAllShifts(id);
  }
}
