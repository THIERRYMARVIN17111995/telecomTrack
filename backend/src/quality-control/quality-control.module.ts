import { Module } from '@nestjs/common';
import { QualityControlService } from './quality-control.service';
import { QualityControlController } from './quality-control.controller';

@Module({
  controllers: [QualityControlController],
  providers: [QualityControlService],
})
export class QualityControlModule {}
