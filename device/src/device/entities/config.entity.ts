import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm' ;

@Entity({ name: 'config_tbl' })
export class ConfigTable {
  @PrimaryGeneratedColumn({ name: 'ref_id' })
  ref_id: number;

  @Column({name:'name'})
  name: string;

  @Column({name:'FCODE'})
  FCODE: string;

  @Column({name:'Motor_type'})
  Motor_type: string ;

  @Column({name:'PCNTRMODE1'})
  PCNTRMODE1: string ;

  @Column({name:'PCID'})
  PCID: string ;

  @Column({name:'SPCLPREFFREQ1'})
  SPCLPREFFREQ1: string ;

  @Column({name:'PDCVOC1'})
  PDCVOC1: string ;

  @Column({name:'PMAXDCV1'})
  PMAXDCV1: string ;

  @Column({name:'PMAXDCI1'})
  PMAXDCI1: string ;

  @Column({name:'PDCISC'})
  PDCISC: string ;

  @Column({name:'PHEAD'})
  PHEAD: string ;

  @Column({name:'STINTERVAL'})
  STINTERVAL: string ;

  @Column({name:'PFREQHSP1'})
  PFREQHSP1: string ;

  @Column({name:'PMAXFREQ1'})
  PMAXFREQ1: string ;

  @Column({name:'PFREQLSP1'})
  PFREQLSP1: string ;

  @Column({name:'POWER0'})
  POWER0: string ;

  @Column({name:'POWER1'})
  POWER1: string ;

  @Column({name:'POWER2'})
  POWER2: string ;

  @Column({name:'POWER3'})
  POWER3: string ;

  @Column({name:'POWER4'})
  POWER4: string ;

  @Column({name:'POWER5'})
  POWER5: string ;

  @Column({name:'FLOW1'})
  FLOW1: string ;

  @Column({name:'FLOW2'})
  FLOW2: string ;

  @Column({name:'FLOW3'})
  FLOW3: string ;

  @Column({name:'FLOW4'})
  FLOW4: string ;

  @Column({name:'FLOW5'})
  FLOW5: string ;

  @Column({name:'PMAXFLW1'})
  PMAXFLW1: string ;

  @Column({name:'PMAXKW1'})
  PMAXKW1: string ;

  @Column({name:'PREFFREQ1'})
  PREFFREQ1: string ;

  @Column({name:'Pump_type'})
  Pump_type: string ;

  @Column({name:'HP'})
  HP: string ;

  @Column({name:'Panel_wp'})
  Panel_wp: string ;

  @Column({name:'rmu_ver'})
  rmu_ver: string ;

  @Column({name:'rmu_rev'})
  rmu_rev: string ;

  @Column({name:'rmu_srno'})
  rmu_srno: string ;

  @Column({name:'Board_ver'})
  Board_ver: string ;

  @Column({name:'Board_rev'})
  Board_rev: string ;

  @Column({name:'Board_date'})
  Board_date: string ;

  @Column({name:'Board_pcbno'})
  Board_pcbno: string ;
}
