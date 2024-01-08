import { IsNotEmpty, IsOptional } from "class-validator";

export class updateOemDto{
    @IsNotEmpty()
    name:string;

    @IsOptional()
    email?:string;
}