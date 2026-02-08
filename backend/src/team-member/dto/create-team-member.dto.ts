import { IsString, IsNotEmpty, IsUUID, IsOptional } from 'class-validator';

export class CreateTeamMemberDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    role: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    address: string;


    @IsUUID()
    subsidiaryId: string;

    @IsString()
    @IsNotEmpty()
    nameTeam: string;

    @IsString()
    @IsNotEmpty()
    type: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsNotEmpty()
    nationalityMember: string;

    @IsString()
    @IsNotEmpty()
    nationalityTeam: string;

}
