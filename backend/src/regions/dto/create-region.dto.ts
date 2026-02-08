import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateRegionDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsUUID()
    subsidiaryId: string;
}
