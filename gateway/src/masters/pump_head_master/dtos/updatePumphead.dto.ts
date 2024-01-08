import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdatePumpHeadDto{

    @IsNotEmpty()
    code:string;

    @IsOptional()
    description?:string;
    
}