import { Module } from '@nestjs/common';
import { AcceptanceService } from './acceptance.service';
import { AcceptanceController } from './acceptance.controller';

@Module({
  controllers: [AcceptanceController],
  providers: [AcceptanceService],
})
export class AcceptanceModule {}
