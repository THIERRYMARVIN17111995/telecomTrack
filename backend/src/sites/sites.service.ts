import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Site } from './entities/site.entity';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { Filiale } from 'src/filiale/entities/filiale.entity';
import { Region } from 'src/regions/entities/region.entity';
import { Project } from 'src/project/entities/project.entity';
import { ProjetSiteService } from 'src/projet-site/projet-site.service';

@Injectable()
export class SitesService {
  constructor(
    @InjectRepository(Site)
    private siteRepo: Repository<Site>,

    // @InjectRepository(Filiale)
    // private filialeRepo: Repository<Filiale>,

    @InjectRepository(Region)
    private regionRepo: Repository<Region>,

    private readonly projectSiteService: ProjetSiteService
  ) { }

  async create(dto: CreateSiteDto): Promise<Site> {

    console.log(dto)
    // Vérification de la région
    const region = await this.regionRepo.findOne({
      where: { id: dto.regionId },
    });

    if (!region) {
      throw new NotFoundException(`Region ${dto.regionId} not found`);
    }

    // Création du site
    const site = this.siteRepo.create({
      ...dto,
      region,
    });

    // Sauvegarde (IMPORTANT)
    const savedSite = await this.siteRepo.save(site);

    // Liaison Site ↔ Project (optionnelle)
    if (dto.projectId && savedSite) {
      await this.projectSiteService.create({
        projectId: dto.projectId,
        siteId: savedSite.id,
      });
    }

    return savedSite;
  }


  findAll(): Promise<Site[]> {
    return this.siteRepo.find({ relations: ['region'] });
  }

  async findOne(id: number): Promise<Site> {
    const site = await this.siteRepo.findOne({
      where: { id }
    });
    if (!site) throw new NotFoundException(`Site ${id} not found`);
    return site;
  }

  async update(id: number, dto: UpdateSiteDto): Promise<Site> {
    const site = await this.findOne(id);

    // 🔹 Region
    if (dto.regionId) {
      const region = await this.regionRepo.findOne({
        where: { id: dto.regionId },
      });

      if (!region) {
        throw new NotFoundException(`Region ${dto.regionId} not found`);
      }

      site.region = region;
    }

    // 🔹 Champs simples
    const { regionId, projectId, ...siteData } = dto;
    Object.assign(site, siteData);

    // 🔹 Projet (via table pivot)
    if (dto.projectId) {
      await this.projectSiteService.updateOrCreate({
        siteId: site.id,
        projectId: dto.projectId,
      });
    }

    return this.siteRepo.save(site);
  }


  async update2(id: number,projectSiteId:string, dto: UpdateSiteDto): Promise<Site> {
    const site = await this.findOne(id);

    // 🔹 Mise à jour de la région
    if (dto.regionId) {
      const region = await this.regionRepo.findOne({
        where: { id: dto.regionId },
      });

      if (!region) {
        throw new NotFoundException(`Region ${dto.regionId} not found`);
      }

      site.region = region;
    }

    // 🔹 Mise à jour du site (hors relations)
    const { regionId, projectId, ...siteData } = dto;
    Object.assign(site, siteData);

    // 🔹 Gestion relation Site ↔ Project
    if (dto.projectId) {
      await this.projectSiteService.update(projectSiteId,{
        siteId: site.id,
        projectId: dto.projectId
      });
    }

    return this.siteRepo.save(site);
  }


  async remove(id: number): Promise<void> {
    const res = await this.siteRepo.softDelete(id);
    if (!res.affected) throw new NotFoundException(`Site ${id} not found`);
  }
}
