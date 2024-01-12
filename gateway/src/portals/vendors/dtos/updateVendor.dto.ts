import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class updateVendorDto {
  
  @ApiProperty()
  @IsNotEmpty()
  ref_id: number;

  
  @ApiProperty()
  @IsOptional()
  state_id?: number;

  
  @ApiProperty()
  @IsOptional()
  name?: string;

  
  @ApiProperty()
  @IsOptional()
  username?: string;

  
  @ApiProperty()
  @IsOptional()
  password?: string;
}
