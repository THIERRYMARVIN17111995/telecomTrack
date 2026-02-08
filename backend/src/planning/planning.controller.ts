import { Controller, Get, Post, Body, Param, Put, Delete, BadRequestException, Req, UseGuards } from '@nestjs/common';
import { PlanningService } from './planning.service';
import { CreatePlanningDto } from './dto/create-planning.dto';
import { UpdatePlanningDto } from './dto/update-planning.dto';
import { Planning } from './entities/planning.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('plannings')
export class PlanningController {
  constructor(private readonly planningService: PlanningService) { }

  @UseGuards(AuthGuard)
  @Post('create')
  create(@Body() createPlanningDto: CreatePlanningDto, @Req() req: any) {
    // Récupération de l'userId depuis le token JWT
    const userId = req.user?.userId;
    if (!userId) {
      throw new BadRequestException('User not authenticated');
    }
    return this.planningService.create(createPlanningDto, userId);
  }

  @Get('getAll')
  findAll(): Promise<Planning[]> {
    return this.planningService.findAll();
  }

  @Get('selectById/:id')
  findOne(@Param('id') id: string): Promise<Planning> {
    return this.planningService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateDto: UpdatePlanningDto) {
    return this.planningService.update(id, updateDto);
  }

  @UseGuards(AuthGuard)
  @Delete('delete/:id')
  remove(@Param('id') id: string): Promise<void> {
    return this.planningService.remove(id);
  }
}
