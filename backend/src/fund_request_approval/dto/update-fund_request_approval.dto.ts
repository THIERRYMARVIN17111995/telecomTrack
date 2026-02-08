import { PartialType } from '@nestjs/mapped-types';
import { CreateFundRequestApprovalDto } from './create-fund_request_approval.dto';

export class UpdateFundRequestApprovalDto extends PartialType(CreateFundRequestApprovalDto) {}
