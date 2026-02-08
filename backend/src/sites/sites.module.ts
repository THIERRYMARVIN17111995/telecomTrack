import { Module } from '@nestjs/common';
import { SitesService } from './sites.service';
import { SitesController } from './sites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Site } from './entities/site.entity';
import { Filiale } from 'src/filiale/entities/filiale.entity';
import { Region } from 'src/regions/entities/region.entity';
import { Project } from 'src/project/entities/project.entity';
import { ProjetSiteService } from 'src/projet-site/projet-site.service';
import { ProjetSiteModule } from 'src/projet-site/projet-site.module';

@Module({
  imports: [TypeOrmModule.forFeature([Site,Region]),ProjetSiteModule],
  controllers: [SitesController],
  providers: [SitesService],
})
export class SitesModule { }
