import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class RidDto {

    @ApiProperty()
    @IsNotEmpty()
    rid: string;


    @ApiProperty()
    @IsNotEmpty()
    CONT_MFR: number
}