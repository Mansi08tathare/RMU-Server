import {  IsOptional } from "class-validator";

export class UpdateSimDto{
    @IsOptional()
    simno?:number;

    @IsOptional()
    operator?:string;

    @IsOptional()
    mobileno?:number;

    @IsOptional()
    rid?:number;
}