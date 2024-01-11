import { IsNotEmpty, IsString } from 'class-validator';

export class PumpSiteDTO {
  @IsNotEmpty()
  ref_id: number;

  @IsString()
  @IsNotEmpty()
  rid: string;

  @IsString()
  @IsNotEmpty()
  pump_key_number: string;

  @IsString()
  @IsNotEmpty()
  hp: string;

  @IsString()
  @IsNotEmpty()
  rmu_version: string;

  @IsString()
  @IsNotEmpty()
  pump_set_id: string;

  @IsString()
  @IsNotEmpty()
  controller_serial_number: string;

  @IsString()
  @IsNotEmpty()
  motor_serial_number: string;

  @IsString()
  @IsNotEmpty()
  pump_head_serial_number: string;

  @IsString()
  @IsNotEmpty()
  pcb_serial_number: string;

  @IsString()
  @IsNotEmpty()
  hw_version_number: string;

  @IsString()
  @IsNotEmpty()
  sw_version_number: string;

  @IsString()
  @IsNotEmpty()
  sw_revision_number: string;

  @IsString()
  @IsNotEmpty()
  po_ref: string;
}
