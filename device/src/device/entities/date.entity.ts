import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { YearMonth } from './year_month.entity';


@Entity({ name: 'date' })
export class DateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => YearMonth, yearMonth => yearMonth.id)
  @JoinColumn({ name: 'ym_id' })
  yearMonth: YearMonth;

  @Column({ length: 45 })
  ado: string;

  @Column({ length: 45 })
  date: string;
}
