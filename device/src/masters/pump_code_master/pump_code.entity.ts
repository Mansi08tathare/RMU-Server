import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'pump_code_master' })
export class PumpCodeMaster {
  @PrimaryGeneratedColumn()
  ref_id: number;

  @Column({ length: 1000 })
  code: string;

  @Column({ length: 1000 })
  motor: string;

  @Column({ length: 1000 })
  model: string;

  @Column({ length: 1000 })
  controller: string;

  @Column({ length: 1000 })
  head: string;
}
