import { Entity, PrimaryGeneratedColumn, Column,OneToMany } from 'typeorm';
import { DateEntity } from './date.entity';

@Entity({ name: 'year_month' })
export class YearMonth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 2 })
  month: string;

  @Column({ length: 4 })
  year: string;

  @Column()
  imei_id: number;

  @OneToMany(() => DateEntity, date => date.yearMonth)
  dates: DateEntity[];
}
