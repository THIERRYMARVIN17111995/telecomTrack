import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePlanningDto {
  @IsNotEmpty()
  projectId: string;

  @IsNotEmpty()
  scope: string;

  @IsNotEmpty()
  activityType: string;

  @IsNotEmpty()
  interventionType: string;

  @IsNotEmpty()
  siteNEId: string;

  @IsOptional()
  siteFEId?: string;

  @IsNotEmpty()
  equipeId: string;

  @IsOptional()
  plannedDate?: string;
}
