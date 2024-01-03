import {Entity,PrimaryGeneratedColumn,Column,ManyToMany,JoinTable} from 'typeorm';
import { Rid } from './rid.entity';

@Entity({name:'sim_details_tbl'})
export class Sim {

    @PrimaryGeneratedColumn({name:'ref_id'})
    ref_id:number;

    @Column({name:'simno'})
    simno:number;

    @Column({name:'operator'})
    operator:string;

    @Column({name:'mobileno'})
    mobileno:number;

    @ManyToMany(()=>Rid,rid=>rid.sims)
    @JoinTable({name:'rid_sim_tbl'})
    rids:Rid
}