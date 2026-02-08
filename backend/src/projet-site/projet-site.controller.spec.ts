import { Test, TestingModule } from '@nestjs/testing';
import { ProjetSiteController } from './projet-site.controller';
import { ProjetSiteService } from './projet-site.service';

describe('ProjetSiteController', () => {
  let controller: ProjetSiteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjetSiteController],
      providers: [ProjetSiteService],
    }).compile();

    controller = module.get<ProjetSiteController>(ProjetSiteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
