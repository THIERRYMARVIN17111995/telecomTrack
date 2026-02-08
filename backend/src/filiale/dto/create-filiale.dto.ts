import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateFilialeDto {
    @IsString()
    @IsNotEmpty()
    country: string;

    @IsUUID()
    societyId: string;
}
