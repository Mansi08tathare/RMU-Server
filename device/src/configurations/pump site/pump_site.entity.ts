import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('pump_site')
export class PumpSite {
  @PrimaryGeneratedColumn()
  ref_id: number;

  @Column({ length: 255 })
  rid: string;

  @Column({ length: 255 })
  pump_key_number: string;

  @Column({ length: 255 })
  hp: string;

  @Column({ length: 255 })
  rmu_version: string;

  @Column({ length: 255 })
  pump_set_id: string;

  @Column({ length: 255 })
  controller_serial_number: string;

  @Column({ length: 255 })
  motor_serial_number: string;

  @Column({ length: 255 })
  pump_head_serial_number: string;

  @Column({ length: 255 })
  pcb_serial_number: string;

  @Column({ length: 255 })
  hw_version_number: string;

  @Column({ length: 255 })
  sw_version_number: string;

  @Column({ length: 255 })
  sw_revision_number: string;

  @Column({ length: 255 })
  po_ref: string;
}
