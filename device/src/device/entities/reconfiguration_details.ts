import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'reconfiguration_details_tbl' })
export class ReconfigurationDetail {
  @PrimaryGeneratedColumn({ type: 'int' })
  ref_id: number;

  @Column({ type: 'varchar', length: 50 })
  rid: string;

  @Column({ type: 'varchar', length: 50 })
  imei: string;

  @Column({ type: 'varchar', length: 255 })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  userid: string;

  @Column({ type: 'varchar', length: 255 })
  request_time: string;

  @Column({ type: 'datetime' })
  server_time: Date;

  @Column({ type: 'varchar', length: 50 })
  updated_entity: string;
}
