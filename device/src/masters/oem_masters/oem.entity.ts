import { IsEmail } from "class-validator"
import {Entity,PrimaryGeneratedColumn,Column} from 'typeorm'

@Entity({name:'oem_master'})
export class OEM{

    @PrimaryGeneratedColumn({name:'ref_id'})
    ref_id:number

    @Column({name:'name'})
    name:string

    @Column({name:'email'})
    // @IsEmail()
    email:string
}