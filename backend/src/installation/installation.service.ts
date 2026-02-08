import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Installation } from "./entities/installation.entity";
import { Repository } from "typeorm";
import { Project } from "src/project/entities/project.entity";
import { Site } from "src/sites/entities/site.entity";
import { Equipment } from "src/equipment/entities/equipment.entity";
import { CreateInstallationDto } from "./dto/create-installation.dto";
import { UpdateInstallationDto } from "./dto/update-installation.dto";

@Injectable()
export class InstallationService {
  constructor(
    @InjectRepository(Installation)
    private readonly installationRepo: Repository<Installation>,
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
    @InjectRepository(Site)
    private readonly siteRepo: Repository<Site>,
    @InjectRepository(Equipment)
    private readonly equipmentRepo: Repository<Equipment>,
  ) {}

  async create(dto: CreateInstallationDto): Promise<Installation> {
    const project = await this.projectRepo.findOneBy({ id: dto.project_id });
    const site = await this.siteRepo.findOneBy({ id: dto.site_id });
  

    if (!project || !site) {
      throw new NotFoundException('Project, Site or Equipment not found');
    }

    const installation = this.installationRepo.create({
      project,
      site,
      status: dto.status,
    });

    return this.installationRepo.save(installation);
  }

  findAll() {
    return this.installationRepo.find();
  }

  findOne(id: string) {
    return this.installationRepo.findOneBy({ id });
  }

  async update(id: string, dto: UpdateInstallationDto) {
    const installation = await this.findOne(id);
    if (!installation) throw new NotFoundException('Installation not found');

    Object.assign(installation, dto);
    return this.installationRepo.save(installation);
  }

  async remove(id: string) {
    await this.installationRepo.softDelete(id);
    return { message: 'Installation deleted' };
  }
}
