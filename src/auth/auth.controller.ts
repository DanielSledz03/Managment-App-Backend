import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterUserDto } from './dto';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

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
    return this.authService.signin(dto);
  }
}
