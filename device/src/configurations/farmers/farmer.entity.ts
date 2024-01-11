import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('project_details')
export class ProjectDetails {
  @PrimaryGeneratedColumn()
  ref_id: number;

  @Column({ length: 255 })
  rid: string;

  @Column({ length: 255 })
  project_name: string;

  @Column({ length: 255 })
  supplier_name: string;

  @Column({ length: 255 })
  buyer_name: string;

  @Column({ length: 255 })
  farmer_name: string;

  @Column({ length: 255 })
  district: string;

  @Column({ length: 255 })
  taluka: string;

  @Column({ length: 255 })
  village: string;

  @Column({ length: 255 })
  phoneno: string;

  @Column({ length: 255 })
  latitude: string;

  @Column({ length: 255 })
  longitude: string;
}
