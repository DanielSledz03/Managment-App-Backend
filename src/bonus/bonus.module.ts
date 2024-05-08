import { Module } from '@nestjs/common';
import { BonusController } from './bonus.controller';
import { BonusService } from './bonus.service';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [BonusController],
  providers: [BonusService],
  imports: [UserModule],
})
export class BonusModule {}
