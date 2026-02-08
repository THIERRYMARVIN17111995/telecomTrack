import { Module } from '@nestjs/common';
import { ExpenseApprovalService } from './expense-approval.service';
import { ExpenseApprovalController } from './expense-approval.controller';

@Module({
  controllers: [ExpenseApprovalController],
  providers: [ExpenseApprovalService],
})
export class ExpenseApprovalModule {}
