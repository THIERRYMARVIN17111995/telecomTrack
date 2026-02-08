import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseApprovalController } from './expense-approval.controller';
import { ExpenseApprovalService } from './expense-approval.service';

describe('ExpenseApprovalController', () => {
  let controller: ExpenseApprovalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpenseApprovalController],
      providers: [ExpenseApprovalService],
    }).compile();

    controller = module.get<ExpenseApprovalController>(ExpenseApprovalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
