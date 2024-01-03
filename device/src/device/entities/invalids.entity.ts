import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('invalids')
export class Invalid {
  @PrimaryGeneratedColumn({ name: 'ref_id' })
  refId: number;

  @Column({ name: 'imei', length: 255 })
  imei: string;

  @Column({ name: 'status', length: 5000 })
  status: string;

  @Column({ name: 'created_at', type: 'datetime' })
  createdAt: Date;
}
