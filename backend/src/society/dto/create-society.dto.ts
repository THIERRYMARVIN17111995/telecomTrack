import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

export class CreateSocietyDto {
  @IsNotEmpty()
  @IsString()
  nomSociete: string

  @IsOptional()
  @IsString()
  rccm?: string

  @IsOptional()
  @IsString()
  nui?: string

  @IsNotEmpty()
  @IsUUID()
  userId: string 
}