import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'departments' })
export class DepartmentEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ name: 'short_name' })
  shortName: string;

  @Column({ name: 'parent_id', nullable: true })
  parentId?: number | null;

  @ManyToOne(() => DepartmentEntity, (department) => department.children, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'parent_id' })
  parent?: DepartmentEntity;

  @OneToMany(() => DepartmentEntity, (department) => department.parent)
  children: DepartmentEntity[];

  @OneToMany('StaffDepartmentEntity', 'department')
  staffDepartments: any[];

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt?: Date | null;
}
