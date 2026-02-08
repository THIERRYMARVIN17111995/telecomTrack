import { Module } from '@nestjs/common';
import { FundRequestService } from './fund-request.service';
import { FundRequestController } from './fund-request.controller';

@Module({
  controllers: [FundRequestController],
  providers: [FundRequestService],
})
export class FundRequestModule {}
