import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseApprovalService } from './expense-approval.service';

describe('ExpenseApprovalService', () => {
  let service: ExpenseApprovalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpenseApprovalService],
    }).compile();

    service = module.get<ExpenseApprovalService>(ExpenseApprovalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
