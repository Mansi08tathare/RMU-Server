import { IsNotEmpty } from "class-validator";

export class AgencyDto{
    @IsNotEmpty()
    name:string;
}