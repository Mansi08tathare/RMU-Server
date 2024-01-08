import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdatProjectDto{

    @IsNotEmpty()
    project_name:string;

    @IsOptional()
    project_name_erp?:string;

    @IsOptional()
    parent_project?:string;

}