import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminGuard, JwtGuard } from 'src/auth/guard';
import { ShiftsService } from './shifts.service';

@ApiTags('Shifts')
@ApiBearerAuth()
@UseGuards(JwtGuard, AdminGuard)
@Controller('shifts')
export class ShiftsController {
  constructor(private readonly shiftService: ShiftsService) {}

  @Get()
  async getShifts() {
    return await this.shiftService.getShifts();
  }
}
