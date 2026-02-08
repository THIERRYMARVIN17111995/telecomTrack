import { Test, TestingModule } from '@nestjs/testing';
import { FundRequestApprovalService } from './fund_request_approval.service';

describe('FundRequestApprovalService', () => {
  let service: FundRequestApprovalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FundRequestApprovalService],
    }).compile();

    service = module.get<FundRequestApprovalService>(FundRequestApprovalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
