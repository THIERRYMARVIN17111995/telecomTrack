import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamMember } from './entities/team-member.entity';
import { Repository } from 'typeorm';
import { CreateTeamDto } from 'src/teams/dto/create-team.dto';
import { TeamsService } from 'src/teams/teams.service';
import { FilialeService } from 'src/filiale/filiale.service';

@Injectable()
export class TeamMemberService {
  constructor(
    @InjectRepository(TeamMember)
    private readonly teamMemberRepo: Repository<TeamMember>,
    private readonly teamService: TeamsService,
    private readonly subsidiaryService: FilialeService,
  ) { }


  async create(
    createTeamMembersDto: CreateTeamMemberDto[],
  ): Promise<TeamMember[]> {
    const createdMembers: TeamMember[] = [];

    for (const dto of createTeamMembersDto) {

      let team = await this.teamService.findOneByTeamNameAndSub(
        dto.nameTeam,
        dto.subsidiaryId,
      );


      if (!team) {
        team = await this.teamService.create({
          name: dto.nameTeam,
          subsidiaryId: dto.subsidiaryId,
          type: dto.type,
          description: dto.description,
          nationality: dto.nationalityTeam
        });
      }

      const teamMemberExisting = await this.findOneByNameAndTeam(dto.name, team?.id);

      if (teamMemberExisting) {
        continue;
      }

      const teamMember = this.teamMemberRepo.create({
        name: dto.name,
        role: dto.role,
        phone: dto.phone,
        email: dto.email,
        address: dto.address,
        nationality: dto.nationalityMember,
        team,

      });

      const savedMember = await this.teamMemberRepo.save(teamMember);
      createdMembers.push(savedMember);
    }

    return createdMembers;
  }




  findAll() {
    return this.teamService.findAll();
  }
  findOne(id: string) {
    return this.teamService.findTeamById(id);
  }


  async findOneByNameAndTeam(name: string, teamId: string): Promise<TeamMember | null> {
    return this.teamMemberRepo.findOne({
      where: { name, team: { id: teamId } },
      relations: ['team'],
    });
  }



  async updateTeamMembersSimple(
    teamId: string,
    membersDto: CreateTeamMemberDto[],
  ) {
    if (!membersDto || membersDto.length === 0) {
      throw new BadRequestException('Members payload is empty');
    }


    // 1️⃣ Récupérer l'équipe
    const team = await this.teamService.findOne(teamId);
    if (!team) throw new NotFoundException('Team not found');


    // 2️⃣ Extraire les infos équipe depuis le payload
    const firstMember = membersDto[0];

    const subsidiary = await this.subsidiaryService.findOne(firstMember.subsidiaryId);

    await this.teamService.update(teamId, {
      name: firstMember.nameTeam,
      nationality: firstMember.nationalityMember,
      subsidiary,
      type: firstMember.type
    });

    // 4️⃣ HARD DELETE de tous les membres existants
    await this.teamMemberRepo
      .createQueryBuilder()
      .delete()
      .from(TeamMember)
      .where('teamId = :teamId', { teamId })
      .execute();

    // 5️⃣ Créer les nouveaux membres
    const newMembers = membersDto.map(dto =>
      this.teamMemberRepo.create({
        address: dto.address,
        email: dto.email,
        name: dto.name,
        nationality: dto.nationalityMember,
        phone: dto.phone,
        role: dto.role,
        team,
      }),
    );

    // 6️⃣ Sauvegarder
    return this.teamMemberRepo.save(newMembers);
  }










  async remove(id: string) {

    const team = await this.teamService.findOne(id);
    // const team = await this.teamMemberRepo.findOne({
    //   where: { id },
    //   relations: ['team'],
    // });

    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }

    await this.teamMemberRepo.softRemove(team.members);

    await this.teamService.softRemove(team.id);

    return {
      message: `Team with ID ${id} deleted successfully`,
    };
  }


  async removeTeamMember(id: string) {
    const member = await this.teamMemberRepo.findOne({
      where: { id },
    });

    if (!member) {
      throw new NotFoundException(`TeamMember with ID ${id} not found`);
    }

    await this.teamMemberRepo.remove(member);

    return {
      message: `TeamMember with ID ${id} removed successfully`,
    };
  }


}
