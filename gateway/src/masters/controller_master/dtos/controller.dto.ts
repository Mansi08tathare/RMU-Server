import { IsNotEmpty } from "class-validator";

export class controllerDto{
    @IsNotEmpty()
    code:string;

    @IsNotEmpty()
    description:string;
}