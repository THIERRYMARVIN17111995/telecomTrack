import { Test, TestingModule } from '@nestjs/testing';
import { FundDisbursementService } from './fund-disbursement.service';

describe('FundDisbursementService', () => {
  let service: FundDisbursementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FundDisbursementService],
    }).compile();

    service = module.get<FundDisbursementService>(FundDisbursementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
