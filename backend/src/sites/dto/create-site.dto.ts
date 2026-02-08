import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsNumber, IsUUID, Min, Max, isString } from 'class-validator';

export class CreateSiteDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  code: string;

  @IsUUID()
  regionId: string;

  @IsOptional()
  address?: string;

  @IsOptional()
  projectId?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  longitude?: number;

  @IsNotEmpty()
  siteOwner: string;

   @IsOptional()
  cluster?: string;
}
