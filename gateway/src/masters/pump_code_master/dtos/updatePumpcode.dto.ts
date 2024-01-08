import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdatePumpCodeDto{

    @IsNotEmpty()
    code :string

    @IsOptional()
    motor?:string

    @IsOptional()
    model?:string

    @IsOptional()
    controller?:string

    @IsOptional()
    head?:string
    
}