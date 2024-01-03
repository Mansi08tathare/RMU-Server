// rid.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Device } from './device.entity';
import { Sim } from './sim.entity';

@Entity({ name: 'rid_tbl' })
export class Rid {
  @PrimaryGeneratedColumn({ name: 'ref_id' })
  ref_id: number;

  @Column()
  rid: string;

  @Column({ name: 'cont_mfr' })
  cont_mfr: string;

  @ManyToMany(() => Device, device => device.rids)
  @JoinTable({ name: 'rid_device_tbl' })
  devices: Device;

  @ManyToMany(()=>Sim,sim=>sim.rids)
  @JoinTable({name:'rid_sim_tbl'})
  sims:Sim
}


