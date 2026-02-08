import { PartialType } from '@nestjs/mapped-types';
import { CreateFilialeDto } from './create-filiale.dto';

export class UpdateFilialeDto extends PartialType(CreateFilialeDto) {}
