import { IsNotEmpty } from "class-validator";

export class RidDto{
    @IsNotEmpty()
    rid:string;

    @IsNotEmpty()
    CONT_MFR:number
}