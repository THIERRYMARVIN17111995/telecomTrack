import { Controller, Get, Post, Body, Param, Patch, Delete, Put } from '@nestjs/common';

import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { Site } from './entities/site.entity';
import { SitesService } from './sites.service';

@Controller('sites')
export class SitesController {
  constructor(private readonly siteService: SitesService) {}

  @Post('create')
  create(@Body() dto: CreateSiteDto): Promise<Site> {
    console.log(dto)
    return this.siteService.create(dto);
  }

  @Get('list')
  findAll(): Promise<Site[]> {
    return this.siteService.findAll();
  }

  @Get('selectById/:id')
  findOne(@Param('id') id: number): Promise<Site> {
    return this.siteService.findOne(id);
  }

  @Put('update/:id')
  update(@Param('id') id: number,@Param('projectSiteId') projectSiteId: string, @Body() dto: UpdateSiteDto): Promise<Site> {
    return this.siteService.update(id,dto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: number): Promise<void> {
    return this.siteService.remove(id);
  }
}
