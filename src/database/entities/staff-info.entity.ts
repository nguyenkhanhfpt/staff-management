import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { StaffEntity } from './staff.entity';
import { BaseEntity } from './base.entity';
import { OfficeEntity } from './office.entity';

@Entity({ name: 'staff_info' })
export class StaffInfoEntity extends BaseEntity {
  @Column({ name: 'staff_id', type: 'uuid', unique: true })
  staffId: string;

  @Column({ name: 'avatar', nullable: true })
  avatar?: string | null;

  @Column({ nullable: true })
  phone?: string | null;

  @Column({ nullable: true })
  address?: string | null;

  @Column({ name: 'tax_code', nullable: true })
  taxCode?: string | null;

  @Column({ name: 'start_date', type: 'date', nullable: true })
  startDate?: Date | null;

  @Column({ name: 'date_of_birth', type: 'date', nullable: true })
  dateOfBirth?: Date | null;

  @Column({ nullable: true })
  nationality?: string | null;

  @Column({ nullable: true, type: 'text' })
  notes?: string | null;

  @Column({ name: 'office_id', nullable: true })
  officeId?: number | null;

  @OneToOne(() => StaffEntity, (staff) => staff.staffInfo, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'staff_id' })
  staff: StaffEntity;

  @ManyToOne(() => OfficeEntity, (office) => office.staffInfos, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'office_id' })
  office?: OfficeEntity;
}
