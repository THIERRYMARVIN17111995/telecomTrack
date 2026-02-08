import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTeamDto } from './dto/create-team.dto';
import { Team } from './entities/team.entity';
import { TeamMember } from 'src/team-member/entities/team-member.entity';
import { FilialeService } from 'src/filiale/filiale.service';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepo: Repository<Team>,
    private readonly subsidiaryService: FilialeService,
  ) { }

  async create(createTeamDto: CreateTeamDto): Promise<Team> {

    const subsidiary = await this.subsidiaryService.findOne(createTeamDto.subsidiaryId);
    if (!subsidiary) {
      throw new NotFoundException(`Subsidiary with ID ${createTeamDto.subsidiaryId} not found`);
    }

    const team = this.teamRepo.create({
      name: createTeamDto.name,
      description: createTeamDto.description,
      type: createTeamDto.type,
      subsidiary,
      nationality: createTeamDto.nationality
    });

    return this.teamRepo.save(team);
  }


  findTeamById(id: string) {
    return this.teamRepo.findOne({
      where: { id },
      relations: ['members', 'subsidiary'],
    });
  }
  async findOne(id: string): Promise<Team> {
    const team = await this.teamRepo.findOne({ where: { id }, relations: ['members'] });
    if (!team) throw new NotFoundException(`Team with ID ${id} not found`);
    return team;
  }

  async findOneByTeamNameAndSub(
    teamName: string,
    subsidiaryId: string,
  ): Promise<Team | null> {
    const subsidiary = await this.subsidiaryService.findOne(subsidiaryId);

    if (!subsidiary) {
      throw new NotFoundException(`Subsidiary with ID ${subsidiaryId} not found`);
    }

    return this.teamRepo.findOne({
      where: {
        name: teamName,
        subsidiary: { id: subsidiary.id },
      },
      relations: ['subsidiary'],
    });
  }


  async update(id: string, updateData: Partial<Team>): Promise<Team> {
    await this.teamRepo.update(id, updateData);
    return this.findOne(id);
  }

  async softRemove(id: string): Promise<void> {
    const team = await this.findOne(id);
    await this.teamRepo.softRemove(team);
  }

   async remove(id: string): Promise<Team> {
    const team = await this.findOne(id);
   return await this.teamRepo.remove(team);
  }

  async findAll(): Promise<Team[]> {
    return this.teamRepo.find({
      relations: ['members', 'subsidiary'],
    });
  }

}
