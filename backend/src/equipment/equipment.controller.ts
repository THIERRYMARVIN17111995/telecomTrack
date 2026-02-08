import { Controller, Get, Post, Body, Param, Patch, Delete, Put } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';

@Controller('equipments')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  @Post('create')
  create(@Body() dto: CreateEquipmentDto) {
    return this.equipmentService.create(dto);
  }

  @Get('list')
  findAll() {
    return this.equipmentService.findAll();
  }

  @Get('selectById/:id')
  findOne(@Param('id') id: string) {
    return this.equipmentService.findOne(id);
  }

  @Put('update/:id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateEquipmentDto,
  ) {
    return this.equipmentService.update(id, dto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.equipmentService.remove(id);
  }
}
