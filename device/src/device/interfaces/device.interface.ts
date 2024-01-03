export interface Device {
    imei: any;
    state: string;
    vendor: string;
    rid: string;
    state_portal_brokerurl: string;
    state_portal_username: string;
    state_portal_password: any;
    state_portal_clientid: string;
    infotopic: string;
    CONT_MFR: string;
}


export interface StateCredsInterface {
    imei: any;
    state: string;
    vendor: string;
    state_portal_brokerurl: string;
    state_portal_username: string;
    state_portal_password: any;
    state_portal_clientid: string;
    infotopic: string;
}

export interface ConfiguredDeviceInterface {
    "Date": string,
    "Time": string,
    "CONT_MFR": string,
    "User_code": string,
    "User_name": string,
    "HP": string,
    "Rated_head": string,
    "Pump_head": string,
    "Motor_type": string,
    "Pump_type": string,
    "Fcode": string,
    "P0": string,
    "P1": string,
    "F1": string,
    "P2": string,
    "F2": string,
    "P3": string,
    "F3": string,
    "P4": string,
    "F4": string,
    "P5": string,
    "F5": string,
    "Panel_wp": string,
    "Remarks": string,
    "PMAXFREQ1": string,
    "PFREQLSP1": string,
    "PFREQHSP1": string,
    "PREFFREQ1": string,
    "PMAXDCV1": string,
    "PMAXDCI1": string,
    "PMAXKW1": string,
    "PMAXFLW1": string,
    "PDCVOC1": string,
    "PDCISC": string,
    "IMEI": string,
    "Vendor": string,
    "State": string,
    "Controller_no": string,
    "RID_no": string,
    "pcntrmode1": string,
    "spclpreffreq1": string,
    "sinterval": string,
    "Days_output": string
}

export interface cDevice {
    "Dt": string,
    "Time": string,
    "U_code": string,
    "U_name": string,
    "HP": string,
    "R_head": string,
    "P_head": string,
    "M_type": string,
    "P_type": string,
    "Fcode": string,
    "P0": string,
    "P1": string,
    "F1": string,
    "P2": string,
    "F2": string,
    "P3": string,
    "F3": string,
    "P4": string,
    "F4": string,
    "P5": string,
    "F5": string,
    "P_wp": string,
    "Remarks": string,
    "PMAXFREQ1": string,
    "PFREQLSP1": string,
    "PFREQHSP1": string,
    "PREFFREQ1": string,
    "PMAXDCV1": string,
    "PMAXDCI1": string,
    "PMAXKW1": string,
    "PMAXFLW1": string,
    "PDCVOC1": string,
    "PDCISC": string,
    "IMEI": string,
    "Vendor": string,
    "State": string,
    "CONT_MFR": string,
    "Cont_no": string,
    "RID_no": string,
    "pcntrmode1": string,
    "spclpreffreq1": string,
    "sinterval": string,
    "D_op": string,
    "rmu_ver": string,
    "rmu_rev": string,
    "rmu_srno": string,
    "Brd_ver": string,
    "Brd_rev": string,
    "Brd_date": string,
    "Brd_pcbno": string,
    "H1": string,
    "DF1": string,
    "H2": string,
    "DF2": string,
    "H3": string,
    "DF3": string,
    "H4": string,
    "DF4": string,
    "cloud_username"?: string
    "cloud_password"?: string
    "cloud_client_id"?: string
    "broker_url"?: string,
    "port"?: string,
    "topic"?: string,
}

export interface ConfDevice {

}