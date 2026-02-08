import { Injectable } from '@nestjs/common';
import { CreateFundRequestDto } from './dto/create-fund-request.dto';
import { UpdateFundRequestDto } from './dto/update-fund-request.dto';

@Injectable()
export class FundRequestService {
  create(createFundRequestDto: CreateFundRequestDto) {
    return 'This action adds a new fundRequest';
  }

  findAll() {
    return `This action returns all fundRequest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fundRequest`;
  }

  update(id: number, updateFundRequestDto: UpdateFundRequestDto) {
    return `This action updates a #${id} fundRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} fundRequest`;
  }
}
