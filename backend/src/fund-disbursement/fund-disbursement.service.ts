import { Injectable } from '@nestjs/common';
import { CreateFundDisbursementDto } from './dto/create-fund-disbursement.dto';
import { UpdateFundDisbursementDto } from './dto/update-fund-disbursement.dto';

@Injectable()
export class FundDisbursementService {
  create(createFundDisbursementDto: CreateFundDisbursementDto) {
    return 'This action adds a new fundDisbursement';
  }

  findAll() {
    return `This action returns all fundDisbursement`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fundDisbursement`;
  }

  update(id: number, updateFundDisbursementDto: UpdateFundDisbursementDto) {
    return `This action updates a #${id} fundDisbursement`;
  }

  remove(id: number) {
    return `This action removes a #${id} fundDisbursement`;
  }
}
