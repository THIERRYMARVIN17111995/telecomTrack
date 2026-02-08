import { Test, TestingModule } from '@nestjs/testing';
import { FundRequestService } from './fund-request.service';

describe('FundRequestService', () => {
  let service: FundRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FundRequestService],
    }).compile();

    service = module.get<FundRequestService>(FundRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
