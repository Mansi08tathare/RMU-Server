import { IsNotEmpty } from "class-validator";

export class PumpModelDto{

    @IsNotEmpty()
    model:string;

    @IsNotEmpty()
    solar_pump:string;

}