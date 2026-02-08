import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Planning } from './entities/planning.entity';
import { CreatePlanningDto } from './dto/create-planning.dto';
import { UpdatePlanningDto } from './dto/update-planning.dto';
import { Project } from 'src/project/entities/project.entity';
import { Site } from 'src/sites/entities/site.entity';
import { Team } from 'src/teams/entities/team.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PlanningService {
  constructor(
    @InjectRepository(Planning)
    private readonly planningRepo: Repository<Planning>,

    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,

    @InjectRepository(Site)
    private readonly siteRepo: Repository<Site>,

    @InjectRepository(Team)
    private readonly teamRepo: Repository<Team>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) { }

  // async create2(dto: CreatePlanningDto, userId: string): Promise<Planning> {

  //   const project = await this.projectRepo.findOne({ where: { code: dto.projectId } });
  //   if (!project) throw new NotFoundException('Project not found');

  //   const siteNE = await this.siteRepo.findOne({ where: { id: Number(dto.siteNEId) } });
  //   if (!siteNE) throw new NotFoundException('Site NE not found');

    
  //   // Find Site FE (optional)
  //   let siteFE=dto.siteFEId ?  await this.siteRepo.findOne({ where: { id: Number(dto.siteFEId) } }) : null;
  

  //   const team = await this.teamRepo.findOne({ where: { id: dto.equipeId } });
  //   if (!team) throw new NotFoundException('Team not found');

  //   const user = await this.userRepo.findOne({ where: { userId: userId } });
  //   if (!user) throw new NotFoundException('User not found');

  //   const planning = this.planningRepo.create({
  //     project,
  //     scope: dto.scope,
  //     activityType: dto.activityType,
  //     interventionType: dto.interventionType,
  //     siteNE,
  //     siteFE: siteFE,
  //     team: team,
  //     plannedDate: dto.plannedDate ? new Date(dto.plannedDate) : null,
  //     user,
  //   });

  //   return this.planningRepo.save(planning);
  // }

  async create(dto: CreatePlanningDto, userId: string): Promise<Planning> {
    // Find Project
    const project = await this.projectRepo.findOne({ where: { code: dto.projectId } });
    if (!project) throw new NotFoundException('Project not found');

    // Find Site NE
    const siteNE = await this.siteRepo.findOne({ where: { id: Number(dto.siteNEId) } });
    if (!siteNE) throw new NotFoundException('Site NE not found');

    // Find Site FE (optional)
    const siteFE = dto.siteFEId
      ? await this.siteRepo.findOne({ where: { id: Number(dto.siteFEId) } })
      : null;

    // Find Team
    const team = await this.teamRepo.findOne({ where: { id: dto.equipeId } });
    if (!team) throw new NotFoundException('Team not found');

    // Find User
    const user = await this.userRepo.findOne({ where: { userId } });
    if (!user) throw new NotFoundException('User not found');

    // Build Planning object with optional fields
    const planningData: Partial<Planning> = {
      project,
      scope: dto.scope,
      activityType: dto.activityType,
      interventionType: dto.interventionType,
      siteNE,
      team,
      plannedDate: dto.plannedDate ? new Date(dto.plannedDate) : null,
      user,
    };

    if (siteFE) {
      planningData.siteFE = siteFE;
    }

    const planning = this.planningRepo.create(planningData);
    return this.planningRepo.save(planning);
  }


  findAll(): Promise<Planning[]> {
    return this.planningRepo.find({
      relations: ['project', 'team', 'user', 'siteNE', 'siteFE','siteNE.region', 'siteFE.region' ],
    });
  }

  async findOne(id: string): Promise<Planning> {
    const planning = await this.planningRepo.findOne({
      where: { id },
      relations: ['project', 'siteNE', 'siteFE', 'equipeId'],
    });
    if (!planning) throw new NotFoundException('Planning not found');
    return planning;
  }

  async update(id: string, dto: UpdatePlanningDto): Promise<Planning> {
    const planning = await this.findOne(id);
    if (!planning) throw new NotFoundException('Planning not found');

    // ici tu peux mettre à jour les champs
    Object.assign(planning, dto);

    return this.planningRepo.save(planning);
  }

  async remove(id: string): Promise<void> {
    const planning = await this.findOne(id);
    await this.planningRepo.softRemove(planning);
  }
}
