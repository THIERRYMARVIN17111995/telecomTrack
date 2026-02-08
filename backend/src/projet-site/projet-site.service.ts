import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjetSite } from './entities/projet-site.entity';
import { CreateProjetSiteDto } from './dto/create-projet-site.dto';
import { UpdateProjetSiteDto } from './dto/update-projet-site.dto';
import { Site } from 'src/sites/entities/site.entity';
import { Project } from 'src/project/entities/project.entity';

@Injectable()
export class ProjetSiteService {
  constructor(
    @InjectRepository(ProjetSite)
    private readonly projetSiteRepo: Repository<ProjetSite>,

    @InjectRepository(Site)
    private readonly siteRepo: Repository<Site>,

    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
  ) { }

  async create(dto: CreateProjetSiteDto): Promise<ProjetSite> {
    const site = await this.siteRepo.findOne({ where: { id: dto.siteId } });
    if (!site) throw new NotFoundException('Site not found');

    const project = await this.projectRepo.findOne({ where: { id: dto.projectId } });
    if (!project) throw new NotFoundException('Project not found');

    const projetSite = this.projetSiteRepo.create({
      site,
      project,
    });

    return this.projetSiteRepo.save(projetSite);
  }

  findAll(): Promise<ProjetSite[]> {
    return this.projetSiteRepo.find({
      relations: ['site', 'project', 'site.region', 'project.subsidiary', 'project.customer'],
    });
  }

  async findOne(id: string): Promise<ProjetSite> {
    const ps = await this.projetSiteRepo.findOne({
      where: { id },
      relations: ['site', 'project'],
    });

    if (!ps) throw new NotFoundException('ProjetSite not found');
    return ps;
  }

  async update(id: string, dto: UpdateProjetSiteDto): Promise<ProjetSite> {
    const ps = await this.findOne(id);

    if (dto.siteId) {
      const site = await this.siteRepo.findOne({ where: { id: dto.siteId } });
      if (!site) throw new NotFoundException('Site not found');
      ps.site = site;
    }

    if (dto.projectId) {
      const project = await this.projectRepo.findOne({ where: { id: dto.projectId } });
      if (!project) throw new NotFoundException('Project not found');
      ps.project = project;
    }

    return this.projetSiteRepo.save(ps);
  }

  async updateOrCreate(data: { siteId: number; projectId: string }) {
    const existing = await this.projetSiteRepo.findOne({
      where: { site: { id: data.siteId } },
      relations: ['site', 'project'],
    });

    if (existing) {
      const project = await this.projectRepo.findOne({
        where: { id: data.projectId },
      });

      if (!project) {
        throw new NotFoundException('Project not found');
      }

      existing.project = project;
      return this.projetSiteRepo.save(existing);
    }

    return this.create(data);
  }

  async remove(id: string): Promise<void> {
    const ps = await this.findOne(id);
    await this.projetSiteRepo.softRemove(ps);
  }

  async findSitesByProjectCode(projectCode: string): Promise<Site[]> {
    const project = await this.projectRepo.findOne({
      where: { code: projectCode },
    });

    if (!project) throw new NotFoundException('Project not found');

    const projetSites = await this.projetSiteRepo.find({
      where: { project: { id: project.id } },
      relations: ['site'],
    });

    return projetSites.map(ps => ps.site);
  }

    async findSitesByProjectExcluding(
    projectCode: string,
    excludedSiteId: number,
  ): Promise<Site[]> {
    const allSites = await this.findSitesByProjectCode(projectCode);
    return allSites.filter(site => site.id !== excludedSiteId);
  }
}
