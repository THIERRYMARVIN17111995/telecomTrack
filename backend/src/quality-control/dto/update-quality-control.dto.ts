import { PartialType } from '@nestjs/mapped-types';
import { CreateQualityControlDto } from './create-quality-control.dto';

export class UpdateQualityControlDto extends PartialType(CreateQualityControlDto) {}
