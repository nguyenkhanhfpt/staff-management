import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { StaffEntity } from './staff.entity';
import { DepartmentEntity } from './department.entity';
import { BaseEntity } from './base.entity';

@Entity({ name: 'staff_departments' })
export class StaffDepartmentEntity extends BaseEntity {
  @Column({ name: 'staff_id', type: 'uuid' })
  staffId: string;

  @Column({ name: 'department_id' })
  departmentId: number;

  @Column({ name: 'is_default', default: false })
  isDefault: boolean;

  @ManyToOne(() => StaffEntity, (staff) => staff.staffDepartments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'staff_id' })
  staff: StaffEntity;

  @ManyToOne(
    () => DepartmentEntity,
    (department) => department.staffDepartments,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'department_id' })
  department: DepartmentEntity;
}
