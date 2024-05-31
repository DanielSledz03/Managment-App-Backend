import { Module } from '@nestjs/common';
import { ShiftsController } from './shifts.controller';
import { ShiftsService } from './shifts.service';
import { UserModule } from 'src/user/user.module';

@Module({
    controllers: [ShiftsController],
    providers: [ShiftsService],
    imports: [UserModule],
})
export class ShiftsModule {}
