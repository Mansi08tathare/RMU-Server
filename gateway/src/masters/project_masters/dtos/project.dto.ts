import { IsNotEmpty } from "class-validator";

export class ProjectDto{

    @IsNotEmpty()
    project_name:string;

    @IsNotEmpty()
    project_name_erp:string;

    @IsNotEmpty()
    parent_project:string;
}