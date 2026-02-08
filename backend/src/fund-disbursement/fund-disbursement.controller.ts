import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FundDisbursementService } from './fund-disbursement.service';
import { CreateFundDisbursementDto } from './dto/create-fund-disbursement.dto';
import { UpdateFundDisbursementDto } from './dto/update-fund-disbursement.dto';

@Controller('fund-disbursement')
export class FundDisbursementController {
  constructor(private readonly fundDisbursementService: FundDisbursementService) {}

  @Post()
  create(@Body() createFundDisbursementDto: CreateFundDisbursementDto) {
    return this.fundDisbursementService.create(createFundDisbursementDto);
  }

  @Get()
  findAll() {
    return this.fundDisbursementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fundDisbursementService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFundDisbursementDto: UpdateFundDisbursementDto) {
    return this.fundDisbursementService.update(+id, updateFundDisbursementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fundDisbursementService.remove(+id);
  }
}
