import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, Matches, MinLength } from 'class-validator';

export class UserDto {

  // @ApiProperty()
  // @IsNotEmpty()
  // ref_id: number;

  @ApiProperty()
  @IsNotEmpty()
  role: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  //@MinLength(8)
 @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, { message: 'Invalid password format' })
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  // @IsPhoneNumber()
  mobile: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  agency: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  department: string;
}

