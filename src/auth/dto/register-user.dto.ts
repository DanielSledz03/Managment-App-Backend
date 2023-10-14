import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
} from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({
    description: 'Email of the user',
    format: 'email',
    example: 'sledziuxjp@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Name of the user',
    format: 'string',
    example: 'Daniel',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Password of the user',
    format: 'string',
    example: 'Password123!',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty({
    description: 'Id of the administrator',
    format: 'int',
    example: '1',
  })
  @IsInt()
  @IsNotEmpty()
  @IsOptional()
  adminUserId: number;
}
