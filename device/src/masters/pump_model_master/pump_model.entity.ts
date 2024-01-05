import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('pump_model_master')
export class PumpModel {
  @PrimaryGeneratedColumn()
  ref_id: number;

  @Column({ length: 1000 })
  model: string;

  @Column({ length: 1000 })
  solar_pump: string;
}
