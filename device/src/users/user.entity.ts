import { Agency } from 'src/masters/agency_masters/agency.entity'
import {Entity,Column,PrimaryGeneratedColumn,ManyToOne,JoinColumn} from 'typeorm'
import { Role } from './role.entity';

@Entity({name:'users_tbl'})
export class User{

    @PrimaryGeneratedColumn({name:'ref_id'})
    ref_id:number

    // @Column({name:'role'})
    // role:number
    @ManyToOne(() => Role, role => role.users)
  @JoinColumn({ name: 'role' })
  role: Role;

    @Column({name:'email'})
    email:string

    @Column({name:'password'})
    password:string

    @Column({name:'name'})
    name:string

    @Column({name:'mobile'})
    mobile:string

    // @Column({name:'agency'})
    // agency:number
    @ManyToOne(() => Agency, agency => agency.users)
  @JoinColumn({ name: 'agency' })
  agency: Agency;

    @Column({name:'department'})
    department:string

}