import {
  Controller,
  Get,
  Param,
  UseGuards,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AdminGuard, JwtGuard } from 'src/auth/guard';

@ApiBearerAuth()
@Controller('user')
@UseGuards(JwtGuard, AdminGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/:id')
  @ApiResponse({ status: 200, description: 'Returns user data.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async getUser(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.getUser(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
