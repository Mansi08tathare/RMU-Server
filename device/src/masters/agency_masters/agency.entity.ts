import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column ,OneToMany} from 'typeorm' ;

@Entity({name:'agency_master_tbl'})
export class Agency{

    @PrimaryGeneratedColumn({name:'ref_id'})
    ref_id:number;

    @Column({name:'name'})
    name:string;

    @OneToMany(() => User, user => user.agency)
    users: User[];

}