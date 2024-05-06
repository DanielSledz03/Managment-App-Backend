import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterUserDto } from './dto';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiCreatedResponse({
    description: 'User has been successfully registered.',
  })
  @ApiOperation({
    summary: 'Register a new user.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Post('signup')
  signup(@Body() dto: RegisterUserDto) {
    return this.authService.signup(dto);
  }

  @ApiCreatedResponse({
    description: 'User has been successfully logged in.',
  })
  @ApiOperation({
    summary: 'Login a user.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Post('signin')
  signin(@Body() dto: LoginDto) {
    try {
      return this.authService.signin(dto);
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  @ApiCreatedResponse({
    description: 'Password has been successfully changed.',
  })
  @ApiOperation({
    summary: 'Change user password.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @Post('changePassword')
  async changePassword(@Body() dto: ChangePasswordDto): Promise<any> {
    try {
      return this.authService.changePassword(dto);
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  @Post('verifyToken')
  async verifyToken(@Body('refreshToken') refreshToken: string): Promise<any> {
    try {
      return this.authService.verifyToken(refreshToken);
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  @Post('getData')
  async getData(@Body() dto: RefreshTokenDto): Promise<any> {
    try {
      return this.authService.getUserData(dto.refresh_token);
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  @Post('refresh')
  refresh(@Req() request: Request) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return 'No authorization header';
    }

    const token = authHeader.split(' ')[1];
    return this.authService.refreshToken(token);
  }
}
