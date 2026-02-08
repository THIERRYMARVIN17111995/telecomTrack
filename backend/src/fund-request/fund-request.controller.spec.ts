import { Test, TestingModule } from '@nestjs/testing';
import { FundRequestController } from './fund-request.controller';
import { FundRequestService } from './fund-request.service';

describe('FundRequestController', () => {
  let controller: FundRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FundRequestController],
      providers: [FundRequestService],
    }).compile();

    controller = module.get<FundRequestController>(FundRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
