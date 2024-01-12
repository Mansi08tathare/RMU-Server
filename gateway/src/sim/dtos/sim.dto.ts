import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class SimDto {

    @ApiProperty()
    @IsNotEmpty()
    simno: number;


    @ApiProperty()
    @IsNotEmpty()
    operator: string;


    @ApiProperty()
    @IsNotEmpty()
    mobileno: number;


    @ApiProperty()
    @IsNotEmpty()
    rid: number;
}