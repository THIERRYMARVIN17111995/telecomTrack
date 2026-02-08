import { Test, TestingModule } from '@nestjs/testing';
import { FundDisbursementController } from './fund-disbursement.controller';
import { FundDisbursementService } from './fund-disbursement.service';

describe('FundDisbursementController', () => {
  let controller: FundDisbursementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FundDisbursementController],
      providers: [FundDisbursementService],
    }).compile();

    controller = module.get<FundDisbursementController>(FundDisbursementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
