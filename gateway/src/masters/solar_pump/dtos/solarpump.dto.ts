import { IsNotEmpty, IsOptional } from "class-validator";

export class SolarPumpDto{

    @IsNotEmpty()
    description:string;

}

