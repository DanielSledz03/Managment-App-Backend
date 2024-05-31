import { ApiProperty } from '@nestjs/swagger';
import {
    IsDateString,
    IsNotEmpty,
    IsNumber,
    IsOptional,
} from 'class-validator';

export class CreateShiftDto {
    @ApiProperty({
        description: 'Start time of the shift',
        format: 'string',
        example: '2021-09-01T00:00:00.000Z',
    })
    @IsDateString()
    @IsNotEmpty()
    startTime: Date;

    @ApiProperty({
        description: 'End time of the shift',
        format: 'string',
        example: '2021-09-01T00:00:00.000Z',
    })
    @IsDateString()
    @IsOptional()
    endTime?: Date;

    @ApiProperty({
        description: 'Date of the shift',
        format: 'string',
        example: '2021-09-01T00:00:00.000Z',
    })
    @IsDateString()
    @IsNotEmpty()
    date: Date;

    @ApiProperty({
        description: 'User id',
        format: 'number',
        example: 1,
    })
    @IsNumber()
    @IsNotEmpty()
    userId: number;
}
