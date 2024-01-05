import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateConfigDto {
  @IsOptional()
  @IsString()
  Motor_type?: string;

  @IsOptional()
  @IsString()
  PCNTRMODE1?: string;

  @IsOptional()
  @IsString()
  CONTROLLER_NO?: string;

  @IsOptional()
  @IsString()
  SPCLPREFFREQ1?: string;

  @IsOptional()
  @IsString()
  PDCVOC1?: string;

  @IsOptional()
  @IsString()
  PMAXDCV1?: string;

  @IsOptional()
  @IsString()
  PMAXDCI1?: string;

  @IsOptional()
  @IsString()
  PDCISC?: string;

  @IsOptional()
  @IsString()
  Rated_Head?: string;

  @IsOptional()
  @IsString()
  STINTERVAL?: string;

  @IsOptional()
  @IsString()
  PFREQHSP1?: string;

  @IsOptional()
  @IsString()
  PMAXFREQ1?: string;

  @IsOptional()
  @IsString()
  PFREQLSP1?: string;

  @IsOptional()
  @IsString()
  P0?: string;

  @IsOptional()
  @IsString()
  P1?: string;

  @IsOptional()
  @IsString()
  P2?: string;

  @IsOptional()
  @IsString()
  P3?: string;

  @IsOptional()
  @IsString()
  P4?: string;

  @IsOptional()
  @IsString()
  P5?: string;

  @IsOptional()
  @IsString()
  F1?: string;

  @IsOptional()
  @IsString()
  F2?: string;

  @IsOptional()
  @IsString()
  F3?: string;

  @IsOptional()
  @IsString()
  F4?: string;

  @IsOptional()
  @IsString()
  F5?: string;

  @IsOptional()
  @IsString()
  PMAXFLW1?: string;

  @IsOptional()
  @IsString()
  PMAXKW1?: string;

  @IsOptional()
  @IsString()
  PREFFREQ1?: string;

  @IsOptional()
  @IsString()
  Pump_type?: string;

  @IsOptional()
  @IsString()
  HP?: string;

  @IsOptional()
  @IsString()
  Panel_wp?: string;
}
