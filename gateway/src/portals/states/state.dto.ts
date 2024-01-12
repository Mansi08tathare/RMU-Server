import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class StateDto {

    @ApiProperty()
    @IsNotEmpty()
    name: string;


    @ApiProperty()
    @IsNotEmpty()
    url: string;


    @ApiProperty()
    @IsNotEmpty()
    sid: number
}