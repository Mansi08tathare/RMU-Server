import{Entity,PrimaryGeneratedColumn,Column,OneToMany} from 'typeorm'
import { User } from './user.entity';

@Entity({name:'roles_tbl'})
export class Role{

    @PrimaryGeneratedColumn({name:'ref_id'})
    ref_id:number

    @Column({name:'role'})
    role:string

    
  @OneToMany(() => User, user => user.role)
  users: User[];
}