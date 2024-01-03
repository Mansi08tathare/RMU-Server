// import {  Entity, PrimaryGeneratedColumn, ManyToOne,OneToMany, JoinColumn } from 'typeorm';
// import { Rid } from './rid.entity';
// import { Device } from './device.entity';


// @Entity({name:'rid_device_tbl'})
// export class RidDeviceTableEntity {
//   @PrimaryGeneratedColumn({name:'ref_id'})
//   ref_id: number;
// //ridDeviceEntries
//   // @ManyToOne(() => Device,deviceRegistration=>deviceRegistration.ridDeviceEntries)
//   // @JoinTable({ name: 'device_reg_ref_id' })
//   // deviceRegistration: Device;


//   //deviceEntries
// //   @ManyToOne(() => Rid,ridTable=>ridTable.deviceEntries)
// //   @JoinTable({ name: 'rid_ref_id' })
// //   ridTable: Rid;
// //  //rid_ref_id:Rid;

// @ManyToOne(() => Device,device=>device.rids)

// @JoinColumn({name:'device_reg_ref_id'})
// device:Device;

// @OneToMany(()=>Rid,rid=>rid.device)
// @JoinColumn({name:'rid_ref_id'})
// rids:Rid[];




// }

import { Entity, PrimaryGeneratedColumn, ManyToOne,  JoinColumn } from 'typeorm';
import { Rid } from './rid.entity';
import { Device } from './device.entity';

@Entity({ name: 'rid_device_tbl' })
export class DeviceRid {
  @PrimaryGeneratedColumn({ name: 'ref_id' })
  ref_id: number;

  @ManyToOne(() => Rid, rid => rid.devices)
  @JoinColumn({ name: 'rid_ref_id' })
  rid: Rid;

  @ManyToOne(() => Device, device => device.rids)
  @JoinColumn({ name: 'device_reg_ref_id' })
  device: Device;
}
