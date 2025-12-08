import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PostEntity } from './post.entity';
import { StaffInfoEntity } from './staff-info.entity';
import { StaffDepartmentEntity } from './staff-department.entity';
import { STAFF_ROLES, STAFF_STATUSES } from '@shared/enums/app.enum';

@Entity({ name: 'staffs' })
export class StaffEntity {
  @OneToMany(() => PostEntity, (post) => post.staff)
  posts: PostEntity[];

  @OneToOne(() => StaffInfoEntity, (staffInfo) => staffInfo.staff)
  staffInfo?: StaffInfoEntity;

  @OneToMany(
    () => StaffDepartmentEntity,
    (staffDepartment) => staffDepartment.staff,
  )
  staffDepartments: StaffDepartmentEntity[];

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ name: 'password' })
  password: string;

  @Column({
    type: 'enum',
    enum: STAFF_STATUSES,
    default: STAFF_STATUSES.ACTIVE,
  })
  status: STAFF_STATUSES;

  @Column({
    type: 'enum',
    enum: STAFF_ROLES,
    default: STAFF_ROLES.EMPLOYEE,
  })
  role: STAFF_ROLES;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt?: Date | null;
}
