import { Module } from '@nestjs/common';
import { ProjetSiteService } from './projet-site.service';
import { ProjetSiteController } from './projet-site.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjetSite } from './entities/projet-site.entity';
import { Site } from 'src/sites/entities/site.entity';
import { Project } from 'src/project/entities/project.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProjetSite,
      Site,
      Project,
    ]),
  ],
  controllers: [ProjetSiteController],
  providers: [ProjetSiteService],
  exports: [ProjetSiteService],
})
export class ProjetSiteModule { }
