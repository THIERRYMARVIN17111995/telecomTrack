import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { Team } from './entities/team.entity';
import { Filiale } from 'src/filiale/entities/filiale.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilialeService } from 'src/filiale/filiale.service';
import { Society } from 'src/society/entities/society.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Team,Filiale,Society])],
  controllers: [TeamsController],
  providers: [TeamsService,FilialeService],
  exports:[TeamsService]
})
export class TeamsModule {}
