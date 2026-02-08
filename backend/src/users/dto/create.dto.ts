import { IsEmail, IsNotEmpty, IsString, MinLength, IsEnum, IsOptional } from 'class-validator';

export enum UserRole {
    ADMIN = 'admin',
    TECHNICIAN = 'technicien',
    MANAGER = 'manager',
}

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsOptional()
    @IsEnum(UserRole)
    role?: string;
}