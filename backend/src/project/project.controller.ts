import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectStatus } from 'src/types/projectStatus';
import { ProjectService } from './project.service';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectsService: ProjectService) { }

  // CREATE
  @Post('create')
  create(@Body() dto: CreateProjectDto) {
    return this.projectsService.create(dto);
  }

  // READ ALL
  @Get('list')
  findAll() {
    return this.projectsService.findAll();
  }

  // READ ONE
  @Get('selectById/:id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  // UPDATE
  @Put('update/:id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateProjectDto,
  ) {
    return this.projectsService.update(id, dto);
  }

  // SOFT DELETE
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }

  // RESTORE
  @Put('restore/:id/restore')
  restore(@Param('id') id: string) {
    return this.projectsService.restore(+id);
  }

  // FILTER BY STATUS
  @Get('filter/status')
  findByStatus(@Query('status') status: ProjectStatus) {
    return this.projectsService.findByStatus(status);
  }

  // FILTER BY CUSTOMER
  @Get('filter/customer/:customerId')
  findByCustomer(@Param('customerId') customerId: string) {
    return this.projectsService.findByCustomer(customerId);
  }
}
