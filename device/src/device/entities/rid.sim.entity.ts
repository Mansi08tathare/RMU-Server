import { Entity, PrimaryGeneratedColumn, ManyToOne,  JoinColumn } from 'typeorm';
import { Sim } from './sim.entity';
import { Rid } from './rid.entity';

@Entity({ name:'rid_sim_tbl'})
export class RidSim{
    @PrimaryGeneratedColumn({name:'ref_id'})
    ref_id:number;

    @ManyToOne(()=>Sim,sim=>sim.rids)
    @JoinColumn({name:'sim_details_ref_id'})
    sim:Sim;

    @ManyToOne(()=>Rid,rid=>rid.sims)
    @JoinColumn({name:'rid_ref_id'})
    rid:Rid;

}