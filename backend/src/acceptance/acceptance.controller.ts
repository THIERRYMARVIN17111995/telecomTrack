import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AcceptanceService } from './acceptance.service';
import { CreateAcceptanceDto } from './dto/create-acceptance.dto';
import { UpdateAcceptanceDto } from './dto/update-acceptance.dto';

@Controller('acceptance')
export class AcceptanceController {
  constructor(private readonly acceptanceService: AcceptanceService) {}

  @Post()
  create(@Body() createAcceptanceDto: CreateAcceptanceDto) {
    return this.acceptanceService.create(createAcceptanceDto);
  }

  @Get()
  findAll() {
    return this.acceptanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.acceptanceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAcceptanceDto: UpdateAcceptanceDto) {
    return this.acceptanceService.update(+id, updateAcceptanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.acceptanceService.remove(+id);
  }
}
