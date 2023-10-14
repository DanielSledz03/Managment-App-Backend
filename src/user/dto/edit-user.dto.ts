import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsBoolean } from 'class-validator';

export class EditUserDto {
  @ApiProperty({
    description: 'Name of the user',
    format: 'string',
    example: 'Daniel',
  })
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({
    description: 'Rate of the user',
    format: 'number',
    example: 4.5,
  })
  @IsNumber()
  @IsNotEmpty()
  rate?: number;

  @ApiProperty({
    description: 'Archived of the user',
    format: 'boolean',
    example: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  archived?: boolean;

  @ApiProperty({
    description: 'Admin user id',
    format: 'number',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  adminUserId: number;
}
