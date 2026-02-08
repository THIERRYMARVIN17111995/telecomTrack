import { IsUUID, IsInt, IsDateString, IsEnum } from 'class-validator';
import { InstallationStatus } from '../entities/installation.entity';

export class CreateInstallationDto {
  @IsUUID()
  project_id: string;

  @IsUUID()
  site_id: number;

  @IsUUID()
  equipment_id: string;

  // @IsInt()
  // quantity: number;

  // @IsDateString()
  // dateInstallation: string;

  @IsEnum(InstallationStatus)
  status?: InstallationStatus;
}
