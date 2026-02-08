import { Test, TestingModule } from '@nestjs/testing';
import { FilialeController } from './filiale.controller';
import { FilialeService } from './filiale.service';

describe('FilialeController', () => {
  let controller: FilialeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilialeController],
      providers: [FilialeService],
    }).compile();

    controller = module.get<FilialeController>(FilialeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
