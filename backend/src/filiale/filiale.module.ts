import { Module } from '@nestjs/common';
import { FilialeService } from './filiale.service';
import { FilialeController } from './filiale.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Filiale } from './entities/filiale.entity';
import { Society } from 'src/society/entities/society.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Filiale, Society])],
  controllers: [FilialeController],
  providers: [FilialeService],
  exports:[FilialeService]
})
export class FilialeModule { }
