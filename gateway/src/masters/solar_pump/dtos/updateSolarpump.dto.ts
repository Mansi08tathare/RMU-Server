import { IsOptional } from "class-validator";

export class UpdateSolarPumpDto{

    @IsOptional()
    description?:string;
 }