import { Module } from '@nestjs/common';
import { TeamMemberService } from './team-member.service';
import { TeamMemberController } from './team-member.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from 'src/teams/entities/team.entity';
import { TeamsModule } from 'src/teams/teams.module';
import { TeamMember } from './entities/team-member.entity';
import { FilialeService } from 'src/filiale/filiale.service';
import { FilialeModule } from 'src/filiale/filiale.module';

@Module({
  imports: [TypeOrmModule.forFeature([TeamMember,Team]),TeamsModule,FilialeModule],
  controllers: [TeamMemberController],
  providers: [TeamMemberService,],
})
export class TeamMemberModule { }
