import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [UserModule],
})
export class TaskModule {}
