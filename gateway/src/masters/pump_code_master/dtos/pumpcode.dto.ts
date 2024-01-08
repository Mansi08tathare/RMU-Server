import { IsNotEmpty } from "class-validator";

export class PumpCodeDto{

    @IsNotEmpty()
    code :string

    @IsNotEmpty()
    motor:string

    @IsNotEmpty()
    model:string

    @IsNotEmpty()
    controller:string

    @IsNotEmpty()
    head:string
    
}