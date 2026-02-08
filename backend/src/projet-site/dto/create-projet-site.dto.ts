import { IsInt, IsUUID } from "class-validator";

export class CreateProjetSiteDto {

    @IsInt()
    siteId: number;

    @IsUUID()
    projectId: string;
}
