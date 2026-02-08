import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FundRequestApprovalService } from './fund_request_approval.service';
import { CreateFundRequestApprovalDto } from './dto/create-fund_request_approval.dto';
import { UpdateFundRequestApprovalDto } from './dto/update-fund_request_approval.dto';

@Controller('fund-request-approval')
export class FundRequestApprovalController {
  constructor(private readonly fundRequestApprovalService: FundRequestApprovalService) {}

  @Post()
  create(@Body() createFundRequestApprovalDto: CreateFundRequestApprovalDto) {
    return this.fundRequestApprovalService.create(createFundRequestApprovalDto);
  }

  @Get()
  findAll() {
    return this.fundRequestApprovalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fundRequestApprovalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFundRequestApprovalDto: UpdateFundRequestApprovalDto) {
    return this.fundRequestApprovalService.update(+id, updateFundRequestApprovalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fundRequestApprovalService.remove(+id);
  }
}
