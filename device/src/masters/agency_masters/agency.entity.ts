import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm' ;

@Entity({name:'agency_master_tbl'})
export class Agency{

    @PrimaryGeneratedColumn({name:'ref_id'})
    ref_id:number;

    @Column({name:'name'})
    name:string;


}