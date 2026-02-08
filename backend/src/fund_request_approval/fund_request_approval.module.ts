import { Module } from '@nestjs/common';
import { FundRequestApprovalService } from './fund_request_approval.service';
import { FundRequestApprovalController } from './fund_request_approval.controller';

@Module({
  controllers: [FundRequestApprovalController],
  providers: [FundRequestApprovalService],
})
export class FundRequestApprovalModule {}
