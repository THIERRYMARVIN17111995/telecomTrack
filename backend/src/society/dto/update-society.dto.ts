import { PartialType } from '@nestjs/mapped-types'
import { CreateSocietyDto } from './create-society.dto'
import { IsOptional, IsString, IsUUID } from 'class-validator'

export class UpdateSocietyDto extends PartialType(CreateSocietyDto) {
  @IsOptional()
  @IsString()
  nomSociete?: string

  @IsOptional()
  @IsString()
  rccm?: string

  @IsOptional()
  @IsString()
  nui?: string

  @IsOptional()
  @IsUUID()
  userId?: string
}