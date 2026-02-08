import { Test, TestingModule } from '@nestjs/testing';
import { ProjetSiteService } from './projet-site.service';

describe('ProjetSiteService', () => {
  let service: ProjetSiteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjetSiteService],
    }).compile();

    service = module.get<ProjetSiteService>(ProjetSiteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
