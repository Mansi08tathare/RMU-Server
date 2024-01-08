import { IsNotEmpty } from "class-validator";

export class OemDto{

    @IsNotEmpty()
    name:string;

    @IsNotEmpty()
    email:string;
    
    
}