import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('solar_pump_master')
export class SolarPump {
  @PrimaryGeneratedColumn()
  ref_id: number;

  @Column({ length: 1000 })
  description: string;
}
