import { Test, TestingModule } from '@nestjs/testing';
import { InstallationStatusHistoryController } from './installation_status_history.controller';
import { InstallationStatusHistoryService } from './installation_status_history.service';

describe('InstallationStatusHistoryController', () => {
  let controller: InstallationStatusHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InstallationStatusHistoryController],
      providers: [InstallationStatusHistoryService],
    }).compile();

    controller = module.get<InstallationStatusHistoryController>(InstallationStatusHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
