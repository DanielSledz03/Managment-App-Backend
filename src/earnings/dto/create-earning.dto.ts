import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateEarningDto {
  @ApiProperty({
    description: 'User id',
    format: 'number',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    description: 'Month of the earning',
    format: 'number',
    example: 10,
  })
  @IsNumber()
  @IsNotEmpty()
  month: number;

  @ApiProperty({
    description: 'Year of the earning',
    format: 'number',
    example: 2023,
  })
  @IsNumber()
  @IsNotEmpty()
  year: number;

  @ApiProperty({
    description: 'Hours worked of the earning',
    format: 'number',
    example: 134,
  })
  @IsNumber()
  @IsNotEmpty()
  hoursWorked: number;

  @ApiProperty({
    description: 'Earned of the earning',
    format: 'number',
    example: 1340.33,
  })
  @IsNumber()
  @IsNotEmpty()
  earned: number;
}
