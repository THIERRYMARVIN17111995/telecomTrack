import {
    IsDate,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
    Length,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ProjectStatus } from 'src/types/projectStatus';

export class CreateProjectDto {
    @IsString()
    @IsNotEmpty()
    @Length(3, 50)
    code: string;

    @IsString()
    @IsNotEmpty()
    @Length(3, 150)
    name: string;

    @IsUUID()
    customerId: string;

    @IsUUID()
    subsidiaryId: string;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    startDate?: Date;


    @IsOptional()
    @Type(() => Date)
    @IsDate()
    endDate?: Date;

    @IsOptional()
    @IsEnum(ProjectStatus)
    status?: ProjectStatus;
}
