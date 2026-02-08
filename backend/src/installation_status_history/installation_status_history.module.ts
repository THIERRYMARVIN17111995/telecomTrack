import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InstallationStatusHistoryService } from './installation_status_history.service';
import { InstallationStatusHistoryController } from './installation_status_history.controller';
import { Installation } from 'src/installation/entities/installation.entity';
import { InstallationStatusHistory } from './entities/installation_status_history.entity';



@Module({
  imports: [
    TypeOrmModule.forFeature([
      Installation,
      InstallationStatusHistory,
    ]),
  ],
  controllers: [InstallationStatusHistoryController],
  providers: [InstallationStatusHistoryService],
  exports: [InstallationStatusHistoryService], // utile si appelé depuis d'autres modules
})
export class InstallationStatusHistoryModule { }
