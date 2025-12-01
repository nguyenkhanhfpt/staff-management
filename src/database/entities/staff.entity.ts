import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostEntity } from './post.entity';
import { StaffInfoEntity } from './staff-info.entity';
import { StaffDepartmentEntity } from './staff-department.entity';
import { OmitType } from '@nestjs/mapped-types';
import { BaseEntity } from './base.entity';

@Entity({ name: 'staffs' })
export class StaffEntity extends OmitType(BaseEntity, ['id']) {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ name: 'password' })
  password: string;

  @OneToMany(() => PostEntity, (post) => post.staff)
  posts: PostEntity[];

  @OneToOne(() => StaffInfoEntity, (staffInfo) => staffInfo.staff)
  staffInfo?: StaffInfoEntity;

  @OneToMany(
    () => StaffDepartmentEntity,
    (staffDepartment) => staffDepartment.staff,
  )
  staffDepartments: StaffDepartmentEntity[];

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt?: Date | null;
}
