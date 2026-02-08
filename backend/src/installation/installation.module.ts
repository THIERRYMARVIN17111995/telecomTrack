import { Module } from '@nestjs/common';
import { InstallationService } from './installation.service';
import { InstallationController } from './installation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Installation } from './entities/installation.entity';
import { Project } from 'src/project/entities/project.entity';
import { Site } from 'src/sites/entities/site.entity';
import { Equipment } from 'src/equipment/entities/equipment.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Installation,Project,Site,Equipment]),],
  controllers: [InstallationController],
  providers: [InstallationService],
})
export class InstallationModule {}
