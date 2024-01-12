import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class VendorDto {


    @ApiProperty()
    @IsNotEmpty()
    state_id: number;


    @ApiProperty()
    @IsNotEmpty()
    name: string;


    @ApiProperty()
    @IsNotEmpty()
    username: string;


    @ApiProperty()
    @IsNotEmpty()
    password: string;
}