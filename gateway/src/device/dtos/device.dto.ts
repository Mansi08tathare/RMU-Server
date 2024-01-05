import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class DeviceDto {
    @IsNotEmpty({ message: 'Date cannot be empty' })
    @IsString()
    Date: string;

    @IsNotEmpty()
    @IsString()
    Time: string;

    @IsNotEmpty()
    @IsString()
    User_code: string;

    @IsNotEmpty()
    @IsString()
    User_name: string;

    @IsNotEmpty()
    @IsString()
    HP: string;

    @IsNotEmpty()
    @IsString()
    Rated_head: string;

    @IsNotEmpty()
    @IsString()
    Pump_head: string;

    @IsNotEmpty()
    @IsString()
    Motor_type: string;

    @IsNotEmpty()
    @IsString()
    Pump_type: string;

    @IsNotEmpty()
    @IsString()
    Fcode: string;

    @IsNotEmpty()
    @IsString()
    P0: string;

    @IsNotEmpty()
    @IsString()
    P1: string;

    @IsNotEmpty()
    @IsString()
    F1: string;

    @IsNotEmpty()
    @IsString()
    P2: string;

    @IsNotEmpty()
    @IsString()
    F2: string;

    @IsNotEmpty()
    @IsString()
    P3: string;

    @IsNotEmpty()
    @IsString()
    F3: string;

    @IsNotEmpty()
    @IsString()
    P4: string;

    @IsNotEmpty()
    @IsString()
    F4: string;

    @IsNotEmpty()
    @IsString()
    P5: string;

    @IsNotEmpty()
    @IsString()
    F5: string;

    @IsNotEmpty()
    @IsString()
    Panel_wp: string;

    @IsNotEmpty()
    @IsString()
    Remarks: string;

    @IsNotEmpty()
    @IsString()
    PMAXFREQ1: string;

    @IsNotEmpty()
    @IsString()
    PFREQLSP1: string;

    @IsNotEmpty()
    @IsString()
    PFREQHSP1: string;

    @IsNotEmpty()
    @IsString()
    PREFFREQ1: string;

    @IsNotEmpty()
    @IsString()
    PMAXDCV1: string;

    @IsNotEmpty()
    @IsString()
    PMAXDCI1: string;

    @IsNotEmpty()
    @IsString()
    PMAXKW1: string;

    @IsNotEmpty()
    @IsString()
    PMAXFLW1: string;

    @IsNotEmpty()
    @IsString()
    PDCVOC1: string;

    @IsNotEmpty()
    @IsString()
    PDCISC: string;

    @IsNotEmpty()
    @IsString()
    IMEI: string;

    @IsNotEmpty()
    @IsString()
    Vendor: string;

    @IsNotEmpty()
    @IsString()
    State: string;

    @IsNotEmpty()
    @IsString()
    CONT_MFR: string;

    @IsNotEmpty()
    @IsString()
    Controller_no: string;

    @IsNotEmpty()
    @IsString()
    RID_no: string;

    @IsNotEmpty()
    @IsString()
    pcntrmode1: string;

    @IsNotEmpty()
    @IsString()
    spclpreffreq1: string;

    @IsNotEmpty()
    @IsString()
    sinterval: string;

    @IsNotEmpty()
    @IsString()
    Days_output: string;

    @IsOptional()
    @IsString()
    rmu_ver?: string;

    @IsOptional()
    @IsString()
    rmu_rev?: string;

    @IsOptional()
    @IsString()
    rmu_srno?: string;

    @IsOptional()
    @IsString()
    Board_ver?: string;

    @IsOptional()
    @IsString()
    Board_rev?: string;

    @IsOptional()
    @IsString()
    Board_date?: string;

    @IsOptional()
    @IsString()
    Board_pcbno?: string;
}
