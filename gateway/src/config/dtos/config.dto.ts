import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class ConfigurationDto {
  @IsNotEmpty({ message: 'RID cannot be empty' })
  @IsString()
  rid: string;

  @IsNotEmpty({ message: 'FCode cannot be empty' })
  @IsString()
  FCode: string;

  @IsNotEmpty({ message: 'Motor_type cannot be empty' })
  @IsString()
  Motor_type: string;

  @IsNotEmpty({ message: 'PCNTRMODE1 cannot be empty' })
  @IsString()
  PCNTRMODE1: string;

  @IsNotEmpty({ message: 'CONTROLLER_NO cannot be empty' })
  @IsString()
  CONTROLLER_NO: string;

  @IsOptional()
  @IsString()
  SPCLPREFFREQ1?: string;

  @IsNotEmpty({ message: 'PDCVOC1 cannot be empty' })
  @IsString()
  PDCVOC1: string;

  @IsNotEmpty({ message: 'PMAXDCV1 cannot be empty' })
  @IsString()
  PMAXDCV1: string;

  @IsNotEmpty({ message: 'PMAXDCI1 cannot be empty' })
  @IsString()
  PMAXDCI1: string;

  @IsNotEmpty({ message: 'PDCISC cannot be empty' })
  @IsString()
  PDCISC: string;

  @IsNotEmpty({ message: 'Rated_Head cannot be empty' })
  @IsString()
  Rated_Head: string;

  @IsNotEmpty({ message: 'STINTERVAL cannot be empty' })
  @IsString()
  STINTERVAL: string;

  @IsNotEmpty({ message: 'PFREQHSP1 cannot be empty' })
  @IsString()
  PFREQHSP1: string;

  @IsNotEmpty({ message: 'PMAXFREQ1 cannot be empty' })
  @IsString()
  PMAXFREQ1: string;

  @IsNotEmpty({ message: 'PFREQLSP1 cannot be empty' })
  @IsString()
  PFREQLSP1: string;

  @IsNotEmpty({ message: 'P0 cannot be empty' })
  @IsString()
  P0: string;

  @IsNotEmpty({ message: 'P1 cannot be empty' })
  @IsString()
  P1: string;

  @IsNotEmpty({ message: 'P2 cannot be empty' })
  @IsString()
  P2: string;

  @IsNotEmpty({ message: 'P3 cannot be empty' })
  @IsString()
  P3: string;

  @IsNotEmpty({ message: 'P4 cannot be empty' })
  @IsString()
  P4: string;

  @IsNotEmpty({ message: 'P5 cannot be empty' })
  @IsString()
  P5: string;

  @IsNotEmpty({ message: 'F1 cannot be empty' })
  @IsString()
  F1: string;

  @IsNotEmpty({ message: 'F2 cannot be empty' })
  @IsString()
  F2: string;

  @IsNotEmpty({ message: 'F3 cannot be empty' })
  @IsString()
  F3: string;

  @IsNotEmpty({ message: 'F4 cannot be empty' })
  @IsString()
  F4: string;

  @IsNotEmpty({ message: 'F5 cannot be empty' })
  @IsString()
  F5: string;

  @IsNotEmpty({ message: 'PMAXFLW1 cannot be empty' })
  @IsString()
  PMAXFLW1: string;

  @IsNotEmpty({ message: 'PMAXKW1 cannot be empty' })
  @IsString()
  PMAXKW1: string;

  @IsNotEmpty({ message: 'PREFFREQ1 cannot be empty' })
  @IsString()
  PREFFREQ1: string;

  @IsNotEmpty({ message: 'Pump_type cannot be empty' })
  @IsString()
  Pump_type: string;

  @IsNotEmpty({ message: 'HP cannot be empty' })
  @IsString()
  HP: string;

  @IsNotEmpty({ message: 'Panel_wp cannot be empty' })
  @IsString()
  Panel_wp: string;
}
