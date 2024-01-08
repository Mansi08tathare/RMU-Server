import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdatePumpModelDto{

    @IsNotEmpty()
    model:string;

    @IsOptional()
    solar_pump?:string;

}