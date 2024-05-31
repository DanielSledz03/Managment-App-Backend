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
import {
    ApiOperation,
    ApiTags,
    ApiResponse,
    ApiBody,
    ApiParam,
} from '@nestjs/swagger';

@ApiTags('Reward')
@Controller('reward')
export class RewardController {
    constructor(private readonly rewardService: RewardService) {}

    @ApiOperation({ summary: 'Add bonus to user.' })
    @ApiBody({ type: AddBonusToUserDto })
    @ApiResponse({
        status: 201,
        description: 'The bonus has been successfully added.',
    })
    @ApiResponse({ status: 400, description: 'Invalid input data.' })
    @Post('/bonus')
    async addBonusToUser(@Body() addBonusToUserDto: AddBonusToUserDto) {
        return this.rewardService.addBonusToUser(addBonusToUserDto);
    }

    @ApiOperation({ summary: 'Get all user bonuses in this month.' })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'User ID',
        type: Number,
    })
    @ApiResponse({
        status: 200,
        description: 'List of user bonuses for the current month.',
    })
    @ApiResponse({ status: 404, description: 'User not found.' })
    @Get('/bonus/monthly/:id')
    async getUserMonthlyBonuses(@Param('id', ParseIntPipe) id: number) {
        return this.rewardService.getUserMonthlyBonuses(id);
    }

    @ApiOperation({ summary: 'Add penalty to user.' })
    @ApiBody({ type: AddBonusToUserDto })
    @ApiResponse({
        status: 201,
        description: 'The penalty has been successfully added.',
    })
    @ApiResponse({ status: 400, description: 'Invalid input data.' })
    @Post('/penalty')
    async addPenaltyToUser(@Body() addBonusToUserDto: AddBonusToUserDto) {
        return this.rewardService.addPenaltyToUser(addBonusToUserDto);
    }

    @ApiOperation({ summary: 'Get all user penalties in this month.' })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'User ID',
        type: Number,
    })
    @ApiResponse({
        status: 200,
        description: 'List of user penalties for the current month.',
    })
    @ApiResponse({ status: 404, description: 'User not found.' })
    @Get('/penalty/monthly/:id')
    async getUserMonthlyPenalties(@Param('id', ParseIntPipe) id: number) {
        return this.rewardService.getUserMonthlyPenalties(id);
    }
}
