import { Test, TestingModule } from '@nestjs/testing';
import { FundRequestApprovalController } from './fund_request_approval.controller';
import { FundRequestApprovalService } from './fund_request_approval.service';

describe('FundRequestApprovalController', () => {
  let controller: FundRequestApprovalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FundRequestApprovalController],
      providers: [FundRequestApprovalService],
    }).compile();

    controller = module.get<FundRequestApprovalController>(FundRequestApprovalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
