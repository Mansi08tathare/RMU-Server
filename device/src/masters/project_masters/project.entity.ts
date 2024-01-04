import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'project_master' })
export class ProjectMaster {
  @PrimaryGeneratedColumn()
  ref_id: number;

  @Column({ name: 'project_name', length: 255 })
  project_name: string;

  @Column({ name: 'project_name_erp', length: 255 })
  project_name_erp: string;

  @Column({ name: 'parent_project', length: 255 })
  parent_project: string;
}
