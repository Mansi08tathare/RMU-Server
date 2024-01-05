import { IsNotEmpty } from "class-validator";

export class MotorDto{
    @IsNotEmpty()
    code:string;

    @IsNotEmpty()
    description:string;
}