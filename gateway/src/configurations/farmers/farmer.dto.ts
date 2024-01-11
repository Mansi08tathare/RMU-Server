import { IsString, IsNotEmpty, IsPhoneNumber, IsLatitude, IsLongitude } from 'class-validator';

export class ProjectDetailsDTO {
  @IsNotEmpty()
  ref_id: number;

  @IsString()
  @IsNotEmpty()
  rid: string;

  @IsString()
  @IsNotEmpty()
  project_name: string;

  @IsString()
  @IsNotEmpty()
  supplier_name: string;

  @IsString()
  @IsNotEmpty()
  buyer_name: string;

  @IsString()
  @IsNotEmpty()
  farmer_name: string;

  @IsString()
  @IsNotEmpty()
  district: string;

  @IsString()
  @IsNotEmpty()
  taluka: string;

  @IsString()
  @IsNotEmpty()
  village: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber()
  phoneno: string;

  @IsString()
  @IsNotEmpty()
  @IsLatitude()
  latitude: string;

  @IsString()
  @IsNotEmpty()
  @IsLongitude()
  longitude: string;
}
