import { Module } from '@nestjs/common';
import { FundDisbursementService } from './fund-disbursement.service';
import { FundDisbursementController } from './fund-disbursement.controller';

@Module({
  controllers: [FundDisbursementController],
  providers: [FundDisbursementService],
})
export class FundDisbursementModule {}
