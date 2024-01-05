import { IsOptional } from "class-validator";

export class updateStateDto {

    @IsOptional()
    name?:string;

    @IsOptional()
    url?:string;

    @IsOptional()
    sid?:number;
}