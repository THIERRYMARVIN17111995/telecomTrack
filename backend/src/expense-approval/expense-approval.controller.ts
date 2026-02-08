import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExpenseApprovalService } from './expense-approval.service';
import { CreateExpenseApprovalDto } from './dto/create-expense-approval.dto';
import { UpdateExpenseApprovalDto } from './dto/update-expense-approval.dto';

@Controller('expense-approval')
export class ExpenseApprovalController {
  constructor(private readonly expenseApprovalService: ExpenseApprovalService) {}

  @Post()
  create(@Body() createExpenseApprovalDto: CreateExpenseApprovalDto) {
    return this.expenseApprovalService.create(createExpenseApprovalDto);
  }

  @Get()
  findAll() {
    return this.expenseApprovalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expenseApprovalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExpenseApprovalDto: UpdateExpenseApprovalDto) {
    return this.expenseApprovalService.update(+id, updateExpenseApprovalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expenseApprovalService.remove(+id);
  }
}
