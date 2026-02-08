import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { FilialeService } from './filiale.service';
import { CreateFilialeDto } from './dto/create-filiale.dto';
import { UpdateFilialeDto } from './dto/update-filiale.dto';

@Controller('subsidiaries')
export class FilialeController {
  constructor(private readonly filialeService: FilialeService) { }

  @Post('create')
  create(@Body() dto: CreateFilialeDto) {
    return this.filialeService.create(dto);
  }

  @Get('list')
  findAll() {
    return this.filialeService.findAll();
  }

  @Get('selectById/:id')
  findOne(@Param('id') id: string) {
    return this.filialeService.findOne(id);
  }

  @Put('update/:id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateFilialeDto,
  ) {
    return this.filialeService.update(id, dto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.filialeService.remove(id);
  }
}
