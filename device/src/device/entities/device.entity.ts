import { Column, Entity, PrimaryGeneratedColumn,OneToMany,ManyToMany,JoinTable ,ManyToOne,JoinColumn} from 'typeorm';
//import { RidDeviceTableEntity } from './rid.device.entity';
import { Rid } from './rid.entity';
import { Sim } from './sim.entity';
import { Vendor } from './vendor.entity';
import { State } from './state.entity';

@Entity('device_reg_tbl')
export class Device {
  @PrimaryGeneratedColumn({ name: 'ref_id' })
  ref_id: number;

  @Column({ name: 'imei' })
  imei: string;

  // @Column({ name: 'state_id' })
  // state_id: number;

  // @Column({ name: 'vendor_id' })
  // vendor_id: number;

  @ManyToOne(() => State, state => state.devices, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'state_id' })
  state: State;

  @ManyToOne(() => Vendor, vendor => vendor.devices, {
    onDelete: 'CASCADE', 
  })
  @JoinColumn({ name: 'vendor_id' })
  vendor: Vendor;


  @Column({name:'flux_username'})
  flux_username: string;

  @Column({name:'flux_password'})
  flux_password: string;

  @Column({name:'flux_clientid'})
  flux_clientid: string;

  @Column({name:'cloud_username'})
  cloud_username: string;

  @Column({name:'cloud_password'})
  cloud_password: string;

  @Column({name:'cloud_clientid'})
  cloud_clientid: string;

  @Column({name:'flux_status'})
  flux_status: number;

  @Column({name:'cloud_status'})
  cloud_status: number;

  @Column({name:'status'})
  status: number;

  @Column({name:'remarks'})
  remarks: string;

  @Column({name:'creationDate'})
  creationDate: Date;

  @Column({name:'broker_url'})
  broker_url: string;

  @Column({name:'port'})
  port: string;

  @Column({name:'info_topic'})
  info_topic: string;

  @Column({name:'registeredTime'})
  registeredTime: string;

  @Column({name:'usercode'})
  usercode: string;

  @Column({name:'username'})
  username: string;

//   @OneToMany(() => RidDeviceTableEntity, (ridDevice) => ridDevice.deviceRegistration,{cascade:true})
// ridDeviceEntries: RidDeviceTableEntity[];

// @OneToMany(()=>Rid,rid=>rid.device)
// rids:Rid[];
@ManyToMany(() => Rid, rid => rid.devices)
@JoinTable({ name: 'rid_device_tbl' })
rids: Rid;


}


