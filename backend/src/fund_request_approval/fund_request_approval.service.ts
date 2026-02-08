import { Injectable } from '@nestjs/common';
import { CreateFundRequestApprovalDto } from './dto/create-fund_request_approval.dto';
import { UpdateFundRequestApprovalDto } from './dto/update-fund_request_approval.dto';

@Injectable()
export class FundRequestApprovalService {
  create(createFundRequestApprovalDto: CreateFundRequestApprovalDto) {
    return 'This action adds a new fundRequestApproval';
  }

  findAll() {
    return `This action returns all fundRequestApproval`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fundRequestApproval`;
  }

  update(id: number, updateFundRequestApprovalDto: UpdateFundRequestApprovalDto) {
    return `This action updates a #${id} fundRequestApproval`;
  }

  remove(id: number) {
    return `This action removes a #${id} fundRequestApproval`;
  }
}
