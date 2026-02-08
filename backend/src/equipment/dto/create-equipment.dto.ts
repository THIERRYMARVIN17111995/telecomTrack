import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { EquipmentCategory } from '../enum/equipment-category.enum';


export class CreateEquipmentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  model?: string;

  @IsString()
  vendor: string;

  @IsEnum(EquipmentCategory)
  category: EquipmentCategory;

  @IsString()
  unit: string;
}
