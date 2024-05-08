import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { BonusService } from './bonus.service';
import { AddBonusToUserDto } from './dto/add-bonus-to-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Bonus')
@Controller('bonus')
export class BonusController {
  constructor(private readonly bonusService: BonusService) {}

  @ApiOperation({
    summary: 'Add bonus to user.',
  })
  @Post()
  async addBonusToUser(@Body() createBonusDto: AddBonusToUserDto) {
    return await this.bonusService.addBonusToUser(createBonusDto);
  }

  @ApiOperation({
    summary: 'Get all user bonuses in this month.',
  })
  @Get('/monthly/:id')
  async getUserMonthlyBonuses(@Param('id', ParseIntPipe) id: number) {
    return await this.bonusService.getUserMonthlyBonuses(id);
  }
}
