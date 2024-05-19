import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddBonusToUserDto {
  @ApiProperty({
    description: 'Date of the bonus',
    format: 'string',
    example: '2021-09-01T00:00:00.000Z',
  })
  @IsDateString()
  date: string;

  @ApiProperty({
    description: 'Amount of the bonus',
    format: 'number',
    example: 100,
  })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    description: 'Description of the bonus',
    format: 'string',
    example: 'Christmas bonus',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'User id',
    format: 'number',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
