import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from 'typeorm';
import { StaffEntity } from './staff.entity';
import { OmitType } from '@nestjs/mapped-types';
import { BaseEntity } from './base.entity';

@Entity({ name: 'posts' })
export class PostEntity extends OmitType(BaseEntity, ['id']) {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column({ name: 'staff_id', type: 'uuid' })
  staffId: string;

  @ManyToOne(() => StaffEntity, (staff) => staff.posts)
  @JoinColumn({ name: 'staff_id' })
  staff: StaffEntity;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt?: Date | null;
}
