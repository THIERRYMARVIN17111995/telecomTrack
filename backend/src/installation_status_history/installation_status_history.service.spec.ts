import { Test, TestingModule } from '@nestjs/testing';
import { InstallationStatusHistoryService } from './installation_status_history.service';

describe('InstallationStatusHistoryService', () => {
  let service: InstallationStatusHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InstallationStatusHistoryService],
    }).compile();

    service = module.get<InstallationStatusHistoryService>(InstallationStatusHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
