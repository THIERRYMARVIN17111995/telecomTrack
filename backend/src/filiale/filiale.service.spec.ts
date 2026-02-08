import { Test, TestingModule } from '@nestjs/testing';
import { FilialeService } from './filiale.service';

describe('FilialeService', () => {
  let service: FilialeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilialeService],
    }).compile();

    service = module.get<FilialeService>(FilialeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
