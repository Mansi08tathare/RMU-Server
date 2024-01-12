import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('permission_tbl')
export class Permission {
  @PrimaryGeneratedColumn()
  ref_id: number;

  @Column()
  user_id: number;

  @Column({ length: 10, nullable: true })
  dashboard: string;

  @Column({ length: 10, nullable: true })
  analytics: string;

  @Column({ length: 10, nullable: true })
  sim_details: string;

  @Column({ length: 10, nullable: true })
  flow_formula: string;

  @Column({ length: 10, nullable: true })
  farmer_details: string;

  @Column({ length: 10, nullable: true })
  rid_management: string;

  @Column({ length: 10, nullable: true })
  conf_set: string;

  @Column({ length: 10, nullable: true })
  agency_master: string;

  @Column({ length: 10, nullable: true })
  rmu_fw_upload: string;

  @Column({ length: 10, nullable: true })
  user_management: string;

  @Column({ length: 10, nullable: true })
  device_registration: string;

  @Column({ length: 10, nullable: true })
  svmanagement: string;

  @Column({ length: 10, nullable: true })
  project_master: string;

  @Column({ length: 10, nullable: true })
  oem_master: string;

  @Column({ length: 10, nullable: true })
  pump_site: string;
}
