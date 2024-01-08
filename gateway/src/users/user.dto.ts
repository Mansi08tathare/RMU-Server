import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  ref_id: number;

  @IsNotEmpty()
  role: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  mobile: number;

  @IsNotEmpty()
  agency: number;

  @IsNotEmpty()
  department: string;
}
