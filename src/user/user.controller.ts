import {
  Controller,
  Get,
  Param,
  UseGuards,
  NotFoundException,
  ParseIntPipe,
  Patch,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminGuard, JwtGuard } from 'src/auth/guard';
import { ChangePasswordDto, EditUserDto } from './dto';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
@UseGuards(JwtGuard, AdminGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/:id')
  async getUser(@Param('id', ParseIntPipe) id: number) {
    try {
      const user = await this.userService.getUser(id);

      return user;
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  @Get()
  async getAllUser() {
    try {
      const users = await this.userService.getAllUsers();

      return users;
    } catch (error) {
      throw new NotFoundException('Users not found');
    }
  }

  @Patch('/:id/edit')
  async editUserRate(
    @Param('id', ParseIntPipe) id: number,
    @Body() params: EditUserDto,
  ) {
    try {
      const user = await this.userService.editUser(id, params);

      return user;
    } catch (error) {
      throw error;
    }
  }

  @Patch('/:id/change-password')
  async changePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() params: ChangePasswordDto,
  ) {
    try {
      const user = await this.userService.changePassword(id, params);

      return user;
    } catch (error) {
      throw error;
    }
  }
}
