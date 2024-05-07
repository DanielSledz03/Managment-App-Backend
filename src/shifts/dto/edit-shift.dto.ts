import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber } from 'class-validator';

export class EditShiftDto {
  @ApiProperty({
    description: 'End time of the shift',
    format: 'string',
    example: '2021-09-01T00:00:00.000Z',
  })
  @IsDateString()
  endTime: Date;

  @ApiProperty({
    description: 'ID of the shift',
    format: 'number',
    example: 1,
  })
  @IsNumber()
  id: number;
}
