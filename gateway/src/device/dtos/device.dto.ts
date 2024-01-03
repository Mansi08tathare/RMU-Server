import { IsNotEmpty } from "class-validator";

export class DeviceDTO {
    
    Dt: string;
    Time: string;
    U_code: string;
    U_name: string;
    HP: string;
    R_head: string;
    P_head: string;
    M_type: string;
    P_type: string;
    Fcode: string;
    P0: string;
    P1: string;
    F1: string;
    P2: string;
    F2: string;
    P3: string;
    F3: string;
    P4: string;
    F4: string;
    P5: string;
    F5: string;
    P_wp: string;
    Remarks: string;
    PMAXFREQ1: string;
    PFREQLSP1: string;
    PFREQHSP1: string;
    PREFFREQ1: string;
    PMAXDCV1: string;
    PMAXDCI1: string;
    PMAXKW1: string;
    PMAXFLW1: string;
    PDCVOC1: string;
    PDCISC: string;
    IMEI: string;
    Vendor: string;
    State: string;
    CONT_MFR: string;
    Cont_no: string;
    RID_no: string;
    pcntrmode1: string;
    spclpreffreq1: string;
    sinterval: string;
    D_op: string;
    rmu_ver: string;
    rmu_rev: string;
    rmu_srno: string;
    Brd_ver: string;
    Brd_rev: string;
    Brd_date: string;
    Brd_pcbno: string;
    H1: string;
    DF1: string;
    H2: string;
    DF2: string;
    H3: string;
    DF3: string;
    H4: string;
    DF4: string;
    cloud_username?: string;
    cloud_password?: string;
    cloud_client_id?: string;
    broker_url?: string;
    port?: string;
    topic?: string;
}
