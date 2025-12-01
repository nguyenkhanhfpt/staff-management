import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { StaffEntity } from './staff.entity';
import { BaseEntity } from './base.entity';
import { OfficeEntity } from './office.entity';

@Entity({ name: 'staff_info' })
export class StaffInfoEntity extends BaseEntity {
  @Column({ name: 'staff_id', type: 'uuid', unique: true })
  staffId: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  address: string;

  @Column({ name: 'tax_code', nullable: true })
  taxCode: string;

  @Column({ name: 'start_date', type: 'date', nullable: true })
  startDate: Date;

  @Column({ name: 'date_of_birth', type: 'date', nullable: true })
  dateOfBirth: Date;

  @Column({ nullable: true })
  nationality: string;

  @Column({ nullable: true, type: 'text' })
  notes: string;

  @Column({ name: 'office_id', nullable: true })
  officeId: number | null;

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
