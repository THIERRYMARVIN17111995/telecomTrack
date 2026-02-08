import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { Filiale } from 'src/filiale/entities/filiale.entity';

@Module({
   imports: [
    TypeOrmModule.forFeature([Project, Customer,Filiale]), 
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
