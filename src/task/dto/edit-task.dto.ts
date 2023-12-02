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

export class EditTaskDto {
  @ApiProperty({
    description: 'Title of the task',
    format: 'string',
    example: 'Task 1',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Description of the task',
    format: 'string',
    example: 'This is a task',
  })
  @IsOptional()
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
  @IsOptional()
  userId: number;

  @ApiProperty({
    description: 'Rejection reason of the task',
    format: 'string',
    example: "I'm busy",
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  rejectionReason?: string;
}
