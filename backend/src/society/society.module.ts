import { Module } from '@nestjs/common';
import { SocietyService } from './society.service';
import { SocietyController } from './society.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Society } from './entities/society.entity';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
   imports: [TypeOrmModule.forFeature([Society]),UsersModule],
  controllers: [SocietyController],
  providers: [SocietyService],
  
})
export class SocietyModule {}
