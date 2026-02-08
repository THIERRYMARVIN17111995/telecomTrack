import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { InstallationService } from "./installation.service";
import { CreateInstallationDto } from "./dto/create-installation.dto";
import { UpdateInstallationDto } from "./dto/update-installation.dto";

@Controller('installations')
export class InstallationController {
  constructor(private readonly service: InstallationService) {}

  @Post()
  create(@Body() dto: CreateInstallationDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateInstallationDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
