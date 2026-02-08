import { IsString, IsNotEmpty, IsOptional, ValidateNested, IsArray, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';


export class CreateTeamDto {

    @IsUUID()
    subsidiaryId: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    type: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsNotEmpty()
    nationality: string;


}
