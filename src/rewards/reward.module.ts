import { Module } from '@nestjs/common';
import { RewardController } from './reward.controller';
import { RewardService } from './reward.service';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [RewardController],
  providers: [RewardService],
  imports: [UserModule],
})
export class BonusModule {}
