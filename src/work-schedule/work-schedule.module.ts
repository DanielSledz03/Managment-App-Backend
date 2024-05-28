import { Module } from '@nestjs/common';
import { WorkScheduleController } from './work-schedule.controller';
import { WorkScheduleService } from './work-schedule.service';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [WorkScheduleController],
  providers: [WorkScheduleService],
  imports: [UserModule],
})
export class WorkScheduleModule {}
