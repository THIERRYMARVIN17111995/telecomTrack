import { PartialType } from '@nestjs/mapped-types';
import { CreateInstallationStatusHistoryDto } from './create-installation_status_history.dto';

export class UpdateInstallationStatusHistoryDto extends PartialType(CreateInstallationStatusHistoryDto) {}
