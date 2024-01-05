import { IsNotEmpty, IsOptional } from "class-validator";

export class updateMotorDto{
    @IsNotEmpty()
    code:string;

    @IsOptional()
    description?:string;
}