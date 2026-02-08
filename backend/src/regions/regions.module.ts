import { Module } from '@nestjs/common';
import { RegionsService } from './regions.service';
import { RegionsController } from './regions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Region } from './entities/region.entity';
import { Filiale } from 'src/filiale/entities/filiale.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Region, Filiale])],
  controllers: [RegionsController],
  providers: [RegionsService],
})
export class RegionsModule { }
