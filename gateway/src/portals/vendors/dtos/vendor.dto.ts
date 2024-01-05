import { IsNotEmpty } from "class-validator";

export class VendorDto{

    @IsNotEmpty()
    state_id:number;

    @IsNotEmpty()
    name:string;

    @IsNotEmpty()
    username:string;

    @IsNotEmpty()
    password:string;
}