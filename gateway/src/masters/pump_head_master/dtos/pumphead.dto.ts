import { IsNotEmpty } from "class-validator";

export class PumpHeadDto{
    @IsNotEmpty()
    code:string;

    @IsNotEmpty()
    description:string;

}