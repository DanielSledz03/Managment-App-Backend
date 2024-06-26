import {
    Controller,
    Get,
    Param,
    NotFoundException,
    ParseIntPipe,
    Patch,
    Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
    ApiOperation,
    ApiTags,
    ApiResponse,
    ApiParam,
    ApiBody,
} from '@nestjs/swagger';
import { ChangePasswordDto, EditUserDto } from './dto';
import { SanitizedUser } from './types/sanitized-user.type';

@ApiTags('User')
// @ApiBearerAuth()
@Controller('user')
// @UseGuards(JwtGuard)
export class UserController {
    constructor(private userService: UserService) {}

    @ApiOperation({
        summary: 'Get a user by id',
    })
    @ApiParam({
        name: 'id',
        description: 'ID of the user',
        type: Number,
    })
    @ApiResponse({
        status: 200,
        description: 'User found',
    })
    @ApiResponse({
        status: 404,
        description: 'User not found',
    })
    @Get('/:id')
    async getUser(@Param('id', ParseIntPipe) id: number) {
        const user = await this.userService.getUser(id);
        if (user === null || user === undefined) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    @ApiOperation({
        summary: 'Get all users',
    })
    @ApiResponse({
        status: 200,
        description: 'Users found',
    })
    @ApiResponse({
        status: 404,
        description: 'Users not found',
    })
    @Get()
    async getAllUsers(): Promise<SanitizedUser[]> {
        const users = await this.userService.getAllUsers();
        if (users.length === 0) {
            throw new NotFoundException('Users not found');
        }
        return users;
    }

    // @UseGuards(AdminGuard)
    @ApiOperation({
        summary: 'Edit a user by id',
    })
    @ApiParam({
        name: 'id',
        description: 'ID of the user to edit',
        type: Number,
    })
    @ApiBody({
        description: 'Data for editing the user',
        type: EditUserDto,
    })
    @ApiResponse({
        status: 200,
        description: 'User edited successfully',
    })
    @ApiResponse({
        status: 404,
        description: 'User not found',
    })
    @Patch('/:id/edit')
    async editUser(
        @Param('id', ParseIntPipe) id: number,
        @Body() editUserDto: EditUserDto,
    ) {
        const user = await this.userService.editUser(id, editUserDto);
        if (user === null || user === undefined) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    @ApiOperation({
        summary: 'Change password for a user by id',
    })
    @ApiParam({
        name: 'id',
        description: 'ID of the user to change password for',
        type: Number,
    })
    @ApiBody({
        description: 'Data for changing the password',
        type: ChangePasswordDto,
    })
    @ApiResponse({
        status: 200,
        description: 'Password changed successfully',
    })
    @ApiResponse({
        status: 404,
        description: 'User not found',
    })
    @Patch('/:id/change-password')
    async changePassword(
        @Param('id', ParseIntPipe) id: number,
        @Body() changePasswordDto: ChangePasswordDto,
    ) {
        const user = await this.userService.changePassword(
            id,
            changePasswordDto,
        );
        if (user === null || user === undefined) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    @ApiOperation({
        summary: 'Get all earnings for a user this month',
    })
    @ApiParam({
        name: 'id',
        description: 'ID of the user to get earnings for',
        type: Number,
    })
    @ApiResponse({
        status: 200,
        description: 'Earnings found',
    })
    @ApiResponse({
        status: 404,
        description: 'User not found',
    })
    @Get('/:id/earnings')
    async getUserAllEarningThisMonth(@Param('id', ParseIntPipe) id: number) {
        const earnings = await this.userService.getUserAllEarningThisMonth(id);
        if (earnings === null || earnings === undefined) {
            throw new NotFoundException('User not found');
        }
        return earnings;
    }

    @ApiOperation({
        summary: 'Get sum of shifts for a user this month',
    })
    @ApiParam({
        name: 'id',
        description: 'ID of the user to get shifts for',
        type: Number,
    })
    @ApiResponse({
        status: 200,
        description: 'Shifts found',
    })
    @ApiResponse({
        status: 404,
        description: 'User not found',
    })
    @Get('/:id/shifts')
    async getUserAllShiftsThisMonth(@Param('id', ParseIntPipe) id: number) {
        const shifts = await this.userService.getUserAllShiftsThisMonth(id);
        if (shifts === null || shifts === undefined) {
            throw new NotFoundException('User not found');
        }
        return shifts;
    }
}
