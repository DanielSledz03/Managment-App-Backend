import {
  Controller,
  Get,
  UseGuards,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { EditTaskDto } from './dto/edit-task.dto';
import { Task } from '@prisma/client';

@ApiTags('Task')
@ApiBearerAuth()
@Controller('task')
@UseGuards(JwtGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOperation({
    summary: 'Get all tasks.',
  })
  @Get()
  async getAllTasks(@Request() req): Promise<Task[]> {
    return await this.taskService.getAllTasks(req.user.id);
  }

  @ApiOperation({
    summary: 'Get a task by id.',
  })
  @Get('/:id')
  async getTask(@Param('id', ParseIntPipe) id: number) {
    return await this.taskService.getTask(id);
  }

  @ApiOperation({
    summary: 'Get all tasks by user id.',
  })
  @Get('/user/:id')
  async getTasksByUserId(@Param('id', ParseIntPipe) id: number) {
    return await this.taskService.getTasksByUserId(id);
  }

  @ApiOperation({
    summary: 'Create a new task.',
  })
  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    return await this.taskService.createTask(createTaskDto);
  }

  @ApiOperation({
    summary: 'Update a task by id.',
  })
  @Patch('/:id')
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: EditTaskDto,
  ) {
    return await this.taskService.updateTask(id, updateTaskDto);
  }
}
