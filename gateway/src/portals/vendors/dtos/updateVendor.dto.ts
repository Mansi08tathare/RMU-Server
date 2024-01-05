import { IsNotEmpty, IsOptional } from 'class-validator';

export class updateVendorDto {
  @IsNotEmpty()
  ref_id: number;

  @IsOptional()
  state_id?: number;

  @IsOptional()
  name?: string;

  @IsOptional()
  username?: string;

  @IsOptional()
  password?: string;
}
