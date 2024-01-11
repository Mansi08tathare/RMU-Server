import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, Matches, MinLength } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  ref_id: number;

  @IsNotEmpty()
  role: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  //@MinLength(8)
 @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, { message: 'Invalid password format' })
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  // @IsPhoneNumber()
  mobile: number;

  @IsString()
  @IsNotEmpty()
  agency: number;

  @IsString()
  @IsNotEmpty()
  department: string;
}

