import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Title of the task',
    format: 'string',
    example: 'Task 1',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Description of the task',
    format: 'string',
    example: 'This is a task',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Is completed of the task',
    format: 'boolean',
    example: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  isCompleted: boolean;

  @ApiProperty({
    description: 'User id',
    format: 'number',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
