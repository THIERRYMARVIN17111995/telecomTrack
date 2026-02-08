import { PartialType } from '@nestjs/mapped-types';
import { CreateFundDisbursementDto } from './create-fund-disbursement.dto';

export class UpdateFundDisbursementDto extends PartialType(CreateFundDisbursementDto) {}
