import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QualityControlService } from './quality-control.service';
import { CreateQualityControlDto } from './dto/create-quality-control.dto';
import { UpdateQualityControlDto } from './dto/update-quality-control.dto';

@Controller('quality-control')
export class QualityControlController {
  constructor(private readonly qualityControlService: QualityControlService) {}

  @Post()
  create(@Body() createQualityControlDto: CreateQualityControlDto) {
    return this.qualityControlService.create(createQualityControlDto);
  }

  @Get()
  findAll() {
    return this.qualityControlService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.qualityControlService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQualityControlDto: UpdateQualityControlDto) {
    return this.qualityControlService.update(+id, updateQualityControlDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.qualityControlService.remove(+id);
  }
}
