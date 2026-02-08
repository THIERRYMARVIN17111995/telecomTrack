import { Module } from '@nestjs/common';
import { PlanningService } from './planning.service';
import { PlanningController } from './planning.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planning } from './entities/planning.entity';
import { Project } from 'src/project/entities/project.entity';
import { Site } from 'src/sites/entities/site.entity';
import { Team } from 'src/teams/entities/team.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
    imports: [
    TypeOrmModule.forFeature([Planning, Project, Site, Team, User]),
  ],
  controllers: [PlanningController],
  providers: [PlanningService],
})
export class PlanningModule {}
