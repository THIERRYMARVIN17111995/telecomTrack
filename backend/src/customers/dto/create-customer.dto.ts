import { IsEmail, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateCustomerDto {

    @IsString()
    name: string;

    @IsString()
    country: string;

    @IsOptional()
    @IsString()
    rccm?: string;

    @IsOptional()
    @IsString()
    nui?: string;

    @IsOptional()
    @IsString()
    siren?: string;

    @IsOptional()
    @IsString()
    ein?: string;

    @IsOptional()
    @IsString()
    taxId?: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsEmail()
    email?: string;
}
