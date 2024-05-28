import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateWorkScheduleDto {
  @ApiProperty({
    description: 'User id',
    format: 'number',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    description: 'Date of the work schedule',
    format: 'string',
    example: '2021-09-01T00:00:00.000Z',
  })
  @IsDateString()
  date: string;

  @ApiProperty({
    description: 'Start time of the work schedule',
    format: 'string',
    example: '08:00',
  })
  @IsString()
  @IsNotEmpty()
  startTime: string;

  @ApiProperty({
    description: 'End time of the work schedule',
    format: 'string',
    example: '16:00',
  })
  @IsString()
  @IsNotEmpty()
  endTime: string;
}
