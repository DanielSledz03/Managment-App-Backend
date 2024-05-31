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
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
    ApiParam,
    ApiBody,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { EditTaskDto } from './dto/edit-task.dto';
import { Task } from '@prisma/client';

interface ICustomRequest extends Request {
    user: { id: number };
}

@ApiTags('Task')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @ApiOperation({ summary: 'Get all tasks.' })
    @ApiResponse({ status: 200, description: 'List of all tasks.' })
    @Get()
    async getAllTasks(@Request() req: ICustomRequest): Promise<Task[]> {
        return await this.taskService.getAllTasks(req.user.id);
    }

    @ApiOperation({ summary: 'Get a task by id.' })
    @ApiParam({ name: 'id', description: 'Task ID', type: Number })
    @ApiResponse({ status: 200, description: 'Task found.' })
    @ApiResponse({ status: 404, description: 'Task not found.' })
    @Get('/:id')
    async getTask(@Param('id', ParseIntPipe) id: number) {
        return await this.taskService.getTask(id);
    }

    @ApiOperation({ summary: 'Get all tasks by user id.' })
    @ApiParam({ name: 'id', description: 'User ID', type: Number })
    @ApiResponse({ status: 200, description: 'List of tasks for the user.' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    @Get('/user/:id')
    async getTasksByUserId(@Param('id', ParseIntPipe) id: number) {
        return await this.taskService.getTasksByUserId(id);
    }

    @ApiOperation({ summary: 'Create a new task.' })
    @ApiBody({ type: CreateTaskDto })
    @ApiResponse({ status: 201, description: 'Task created successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid input data.' })
    @Post()
    async createTask(@Body() createTaskDto: CreateTaskDto) {
        return await this.taskService.createTask(createTaskDto);
    }

    @ApiOperation({ summary: 'Update a task by id.' })
    @ApiParam({ name: 'id', description: 'Task ID', type: Number })
    @ApiBody({ type: EditTaskDto })
    @ApiResponse({ status: 200, description: 'Task updated successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid input data.' })
    @ApiResponse({ status: 404, description: 'Task not found.' })
    @Patch('/:id')
    async updateTask(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateTaskDto: EditTaskDto,
    ) {
        return await this.taskService.updateTask(id, updateTaskDto);
    }
}
