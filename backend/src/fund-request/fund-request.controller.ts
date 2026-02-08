import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FundRequestService } from './fund-request.service';
import { CreateFundRequestDto } from './dto/create-fund-request.dto';
import { UpdateFundRequestDto } from './dto/update-fund-request.dto';

@Controller('fund-request')
export class FundRequestController {
  constructor(private readonly fundRequestService: FundRequestService) {}

  @Post()
  create(@Body() createFundRequestDto: CreateFundRequestDto) {
    return this.fundRequestService.create(createFundRequestDto);
  }

  @Get()
  findAll() {
    return this.fundRequestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fundRequestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFundRequestDto: UpdateFundRequestDto) {
    return this.fundRequestService.update(+id, updateFundRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fundRequestService.remove(+id);
  }
}
