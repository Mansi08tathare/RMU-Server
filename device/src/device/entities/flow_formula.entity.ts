// src/flow-formula/flow-formula.entity.ts

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'flow_formula' })
export class FlowFormula {
  @PrimaryGeneratedColumn()
  ref_id: number;

  @Column({ length: 255 })
  FCODE: string;

  @Column({ length: 255 })
  do: string;
}
