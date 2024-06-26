import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './common/filters/GlobalExceptionFilter';
import { TaskController } from './task/task.controller';
import { TaskService } from './task/task.service';
import { TaskModule } from './task/task.module';
import { UserService } from './user/user.service';
import { CompanyModule } from './company/company.module';
import { ShiftsModule } from './shifts/shifts.module';
import { BonusModule } from './rewards/reward.module';
import { WorkScheduleModule } from './work-schedule/work-schedule.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        PrismaModule,
        AuthModule,
        UserModule,
        TaskModule,
        CompanyModule,
        ShiftsModule,
        BonusModule,
        WorkScheduleModule,
    ],
    controllers: [AppController, TaskController],
    providers: [
        AppService,
        UserService,
        {
            provide: APP_FILTER,
            useClass: AllExceptionsFilter,
        },
        TaskService,
    ],
    exports: [UserService],
})
export class AppModule {}
