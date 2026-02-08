import { PartialType } from '@nestjs/mapped-types';
import { CreateExpenseApprovalDto } from './create-expense-approval.dto';

export class UpdateExpenseApprovalDto extends PartialType(CreateExpenseApprovalDto) {}
