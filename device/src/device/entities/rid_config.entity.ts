import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn,OneToOne } from 'typeorm';
import {  ConfigTable } from './config.entity';
import { Rid } from './rid.entity';

@Entity({name:'rid_config_tbl'})
export class RidConfig {
  @PrimaryGeneratedColumn({ name: 'ref_id' })
  ref_id: number;

  @ManyToOne(() => Rid ,{cascade:true})
  @JoinColumn({ name: 'rid_ref_id' })
  rid: Rid;

 

  @ManyToOne(() => ConfigTable ,{cascade:true})
  @JoinColumn({ name: 'config_ref_id' })
  config: ConfigTable;
}



 //  @OneToOne(() => Rid)
  //  @JoinColumn({name:'rid_ref_id'})
  //  rid:Rid;