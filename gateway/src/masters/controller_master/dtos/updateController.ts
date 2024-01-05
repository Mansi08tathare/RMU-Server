import { IsNotEmpty, IsOptional } from "class-validator";

export class updateControllerDto{
    @IsNotEmpty()
    code:string;

    @IsOptional()
    description?:string;
}