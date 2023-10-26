import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminGuard, JwtGuard } from 'src/auth/guard';
import { EarningsService } from './earnings.service';
import { CreateEarningDto } from './dto';

@Controller('earning')
@ApiTags('Earning')
@ApiBearerAuth()
@UseGuards(JwtGuard, AdminGuard)
export class EarningsController {
  constructor(private readonly earningService: EarningsService) {}

  @ApiOperation({
    summary: 'Get all earnings.',
  })
  @Get()
  async getAllEarnings() {
    return await this.earningService.getAllEarnings();
  }

  @ApiOperation({
    summary: 'Get an earning by id.',
  })
  @Get('/:id')
  async getEarning(@Param('id', ParseIntPipe) id: number) {
    return await this.earningService.getEarning(id);
  }

  @ApiOperation({
    summary: 'Create a new earning.',
  })
  @Post()
  async createEarning(@Body() dto: CreateEarningDto) {
    return await this.earningService.createEarning(dto);
  }

  @ApiOperation({
    summary: 'Update an earning by id.',
  })
  @Patch('/:id')
  async updateEarning(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateEarningDto,
  ) {
    return await this.earningService.updateEarning(id, dto);
  }
}
