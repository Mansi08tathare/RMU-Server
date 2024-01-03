import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn ,OneToMany} from 'typeorm';
import { State } from './state.entity';
import { Device } from './device.entity';

@Entity('vendors_tbl')
export class Vendor {
  @PrimaryGeneratedColumn()
  ref_id: number;

  @ManyToOne(() => State, state => state.vendors)
  @JoinColumn({ name: 'state_id' })
  state: State;

  // @OneToMany(() => Device, device => device.vendor)
  // devices: Device[];
  @OneToMany(() => Device, device => device.state)
  devices: Device[];


  @Column({ length: 45 })
  name: string;

  @Column({ length: 200 })
  username: string;

  @Column({ length: 200 })
  password: string;
}
