import { Injectable } from '@nestjs/common';
import { CreateExpenseApprovalDto } from './dto/create-expense-approval.dto';
import { UpdateExpenseApprovalDto } from './dto/update-expense-approval.dto';

@Injectable()
export class ExpenseApprovalService {
  create(createExpenseApprovalDto: CreateExpenseApprovalDto) {
    return 'This action adds a new expenseApproval';
  }

  findAll() {
    return `This action returns all expenseApproval`;
  }

  findOne(id: number) {
    return `This action returns a #${id} expenseApproval`;
  }

  update(id: number, updateExpenseApprovalDto: UpdateExpenseApprovalDto) {
    return `This action updates a #${id} expenseApproval`;
  }

  remove(id: number) {
    return `This action removes a #${id} expenseApproval`;
  }
}
