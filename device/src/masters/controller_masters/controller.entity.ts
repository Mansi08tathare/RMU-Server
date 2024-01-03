import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm' ;

@Entity({name:'controller_master'})
export class ControllerMaster{

    @PrimaryGeneratedColumn({name:'ref_id'})
    ref_id:number

    @Column({name:'code'})
    code:string

    @Column({name:'description'})
    description:string

}

