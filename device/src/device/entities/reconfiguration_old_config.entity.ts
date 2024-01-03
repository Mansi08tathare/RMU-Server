// reconfiguration-old-config.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'reconfiguration_old_config_tbl' })
export class ReconfigurationOldConfig {
  @Column({ type: 'varchar', length: 45 })
  FCODE: string;

  @Column({ type: 'varchar', length: 10 })
  Motor_type: string;

  @Column({ type: 'varchar', length: 10 })
  PCNTRMODE1: string;

  @Column({ type: 'varchar', length: 10 })
  PCID: string;

  @Column({ type: 'varchar', length: 50 })
  SPCLPREFFREQ1: string;

  @Column({ type: 'varchar', length: 10 })
  PDCVOC1: string;

  @Column({ type: 'varchar', length: 10 })
  PMAXDCV1: string;

  @Column({ type: 'varchar', length: 10 })
  PMAXDCI1: string;

  @Column({ type: 'varchar', length: 10 })
  PDCISC: string;

  @Column({ type: 'varchar', length: 10 })
  PHEAD: string;

  @Column({ type: 'varchar', length: 20 })
  STINTERVAL: string;

  @Column({ type: 'varchar', length: 20 })
  PFREQHSP1: string;

  @Column({ type: 'varchar', length: 20 })
  PMAXFREQ1: string;

  @Column({ type: 'varchar', length: 20 })
  PFREQLSP1: string;

  @Column({ type: 'varchar', length: 20 })
  POWER0: string;

  @Column({ type: 'varchar', length: 20 })
  POWER1: string;

  @Column({ type: 'varchar', length: 20 })
  POWER2: string;

  @Column({ type: 'varchar', length: 20 })
  POWER3: string;

  @Column({ type: 'varchar', length: 20 })
  POWER4: string;

  @Column({ type: 'varchar', length: 20 })
  POWER5: string;

  @Column({ type: 'varchar', length: 20 })
  FLOW1: string;

  @Column({ type: 'varchar', length: 20 })
  FLOW2: string;

  @Column({ type: 'varchar', length: 20 })
  FLOW3: string;

  @Column({ type: 'varchar', length: 20 })
  FLOW4: string;

  @Column({ type: 'varchar', length: 20 })
  FLOW5: string;

  @Column({ type: 'varchar', length: 20 })
  PMAXFLW1: string;

  @Column({ type: 'varchar', length: 20 })
  PMAXKW1: string;

  @Column({ type: 'varchar', length: 20 })
  PREFFREQ1: string;

  @Column({ type: 'varchar', length: 45 })
  Pump_type: string;

  @Column({ type: 'varchar', length: 45 })
  HP: string;

  @Column({ type: 'varchar', length: 45 })
  Panel_wp: string;

  @Column({ type: 'varchar', length: 50 })
  rid: string;

  @Column({ type: 'varchar', length: 50 })
  imei: string;

  @PrimaryGeneratedColumn({ type: 'int' })
  ref_id: number;
}
