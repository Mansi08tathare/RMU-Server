import {  IsOptional } from "class-validator";

export class UpdateRidDto{
    @IsOptional()
    rid?:string;

    @IsOptional()
    CONT_MFR?:number
}