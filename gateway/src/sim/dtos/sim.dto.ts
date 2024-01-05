import { IsNotEmpty } from "class-validator";

export class SimDto{
    @IsNotEmpty()
    simno:number;

    @IsNotEmpty()
    operator:string;

    @IsNotEmpty()
    mobileno:number;

    @IsNotEmpty()
    rid:number;
}