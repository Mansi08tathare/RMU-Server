import {Entity,PrimaryGeneratedColumn,Column} from 'typeorm'


@Entity('motor_master')
export class Motor{
    @PrimaryGeneratedColumn({name:'ref_id'})
    ref_id:number

    @Column({name:'code'})
    code:string

    @Column({name:'description'})
    description:string

}