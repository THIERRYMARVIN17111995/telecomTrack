import { PartialType } from '@nestjs/mapped-types';
import { CreateProjetSiteDto } from './create-projet-site.dto';

export class UpdateProjetSiteDto extends PartialType(CreateProjetSiteDto) {}
