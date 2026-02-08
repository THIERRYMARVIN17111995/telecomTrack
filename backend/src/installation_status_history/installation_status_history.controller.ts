import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InstallationStatusHistoryService } from './installation_status_history.service';
import { CreateInstallationStatusHistoryDto } from './dto/create-installation_status_history.dto';
import { UpdateInstallationStatusHistoryDto } from './dto/update-installation_status_history.dto';

@Controller('installation-status-history')
export class InstallationStatusHistoryController {
  constructor(private readonly installationStatusHistoryService: InstallationStatusHistoryService) {}

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.installationStatusHistoryService.remove(id);
  }
}
