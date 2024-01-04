import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'pump_head_master' })
export class PumpHeadMaster {
  @PrimaryGeneratedColumn()
  ref_id: number;

  @Column({ length: 1000 })
  code: string;

  @Column({ length: 1000 })
  description: string;
}
