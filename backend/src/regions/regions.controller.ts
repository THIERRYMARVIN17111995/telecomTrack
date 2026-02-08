import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { RegionsService } from './regions.service';
import { CreateRegionDto } from './dto/create-region.dto';

@Controller('regions')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @Post('create')
  create(@Body() dto: CreateRegionDto) {
    return this.regionsService.create(dto);
  }

  @Get('list')
  findAll() {
    return this.regionsService.findAll();
  }

  @Get('selectById/:id')
  findOne(@Param('id') id: string) {
    return this.regionsService.findOne(id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() dto: Partial<CreateRegionDto>) {
    return this.regionsService.update(id, dto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.regionsService.remove(id);
  }
}
