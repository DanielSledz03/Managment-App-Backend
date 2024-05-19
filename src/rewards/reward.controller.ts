import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { RewardService } from './reward.service';
import { AddBonusToUserDto } from './dto/add-bonus-to-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Reward')
@Controller('reward')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @ApiOperation({
    summary: 'Add bonus to user.',
  })
  @Post('/bonus')
  async addBonusToUser(@Body() createBonusDto: AddBonusToUserDto) {
    return await this.rewardService.addBonusToUser(createBonusDto);
  }

  @ApiOperation({
    summary: 'Get all user bonuses in this month.',
  })
  @Get('/bonus/monthly/:id')
  async getUserMonthlyBonuses(@Param('id', ParseIntPipe) id: number) {
    return await this.rewardService.getUserMonthlyBonuses(id);
  }

  @ApiOperation({
    summary: 'Add penalty to user.',
  })
  @Post('/penalty')
  async addPenaltyToUser(@Body() createBonusDto: AddBonusToUserDto) {
    return await this.rewardService.addPenaltyToUser(createBonusDto);
  }

  @ApiOperation({
    summary: 'Get all user penalties in this month.',
  })
  @Get('/penalty/monthly/:id')
  async getUserMonthlyPenalties(@Param('id', ParseIntPipe) id: number) {
    return await this.rewardService.getUserMonthlyPenalties(id);
  }
}
