import { Controller, Get, Post, Body, Patch, Param, Delete, Put, NotFoundException, Query } from '@nestjs/common';
import { ProjetSiteService } from './projet-site.service';
import { CreateProjetSiteDto } from './dto/create-projet-site.dto';
import { UpdateProjetSiteDto } from './dto/update-projet-site.dto';
import { Site } from 'src/sites/entities/site.entity';

@Controller('projet-sites')
export class ProjetSiteController {
    constructor(private readonly projetSiteService: ProjetSiteService) { }

    @Post('create')
    create(@Body() dto: CreateProjetSiteDto) {
        return this.projetSiteService.create(dto);
    }

    @Get('list')
    findAll() {
        return this.projetSiteService.findAll();
    }

    @Get('selectById/:id')
    findOne(@Param('id') id: string) {
        return this.projetSiteService.findOne(id);
    }

    @Put('update/:id')
    update(
        @Param('id') id: string,
        @Body() dto: UpdateProjetSiteDto,
    ) {
        return this.projetSiteService.update(id, dto);
    }

    @Delete('delete/:id')
    remove(@Param('id') id: string) {
        return this.projetSiteService.remove(id);
    }

    @Get('sites/:projectCode')
    async getSitesByProjectCode(@Param('projectCode') projectCode: string): Promise<Site[]> {
        const sites = await this.projetSiteService.findSitesByProjectCode(projectCode);
        if (!sites || sites.length === 0) {
            throw new NotFoundException('No sites found for this project');
        }
        return sites;
    }


    @Get('sites/:projectCode/exclude')
    async getSitesByProjectExcluding(
        @Param('projectCode') projectCode: string,
        @Query('excludedSiteId') excludedSiteId: string, // Query param
    ): Promise<Site[]> {
        if (!excludedSiteId) {
            throw new NotFoundException('Excluded site ID is required');
        }

        const sites = await this.projetSiteService.findSitesByProjectExcluding(
            projectCode,
            parseInt(excludedSiteId, 10),
        );

        if (!sites || sites.length === 0) {
            throw new NotFoundException('No sites found for this project excluding the selected site');
        }

        return sites;
    }
}
