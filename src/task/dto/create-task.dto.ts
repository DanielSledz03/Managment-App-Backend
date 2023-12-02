import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsEnum,
} from 'class-validator';

enum TaskStatus {
  completed = 'completed',
  inprogress = 'inprogress',
  rejected = 'rejected',
}

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
    description: 'Status of the task',
    enum: TaskStatus,
    example: TaskStatus.completed,
  })
  @IsEnum(TaskStatus)
  @IsOptional()
  status: TaskStatus;

  @ApiProperty({
    description: 'User id',
    format: 'number',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
