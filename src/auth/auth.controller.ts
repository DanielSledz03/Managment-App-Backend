import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterUserDto } from './dto';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { Request } from 'express';
import { ChangePasswordDto } from './dto/change-password.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register a new user.' })
  @ApiCreatedResponse({ description: 'User has been successfully registered.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @Post('signup')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async signup(@Body() dto: RegisterUserDto) {
    try {
      return await this.authService.signup(dto);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  @ApiOperation({ summary: 'Login a user.' })
  @ApiCreatedResponse({ description: 'User has been successfully logged in.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @Post('signin')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async signin(@Body() dto: LoginDto) {
    try {
      return await this.authService.signin(dto);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  @ApiOperation({ summary: 'Change user password.' })
  @ApiCreatedResponse({
    description: 'Password has been successfully changed.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @Post('changePassword')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async changePassword(@Body() dto: ChangePasswordDto) {
    try {
      return await this.authService.changePassword(dto);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  @ApiOperation({ summary: 'Verify refresh token.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @Post('verifyToken')
  @ApiBody({ type: RefreshTokenDto })
  async verifyToken(@Body('refreshToken') refreshToken: string) {
    try {
      return await this.authService.verifyToken(refreshToken);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  @ApiOperation({ summary: 'Get user data by refresh token.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @Post('getData')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async getData(@Body() dto: RefreshTokenDto) {
    try {
      return await this.authService.getUserData(dto.refresh_token);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  @ApiOperation({ summary: 'Refresh token using authorization header.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @ApiBearerAuth()
  @Post('refresh')
  refresh(@Req() request: Request) {
    try {
      const authHeader = request.headers.authorization;
      if (!authHeader) {
        throw new InternalServerErrorException('No authorization header');
      }
      const token = authHeader.split(' ')[1];
      return this.authService.refreshToken(token);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
