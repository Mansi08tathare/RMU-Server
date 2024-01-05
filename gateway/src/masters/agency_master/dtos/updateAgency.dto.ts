import { IsNotEmpty } from "class-validator";

export class updateAgencyDto{
    @IsNotEmpty()
    name:string
}