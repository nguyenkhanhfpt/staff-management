import { Column, Entity, OneToMany, DeleteDateColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { StaffInfoEntity } from './staff-info.entity';

@Entity({ name: 'offices' })
export class OfficeEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  location?: string | null;

  @OneToMany(() => StaffInfoEntity, (staffInfo) => staffInfo.office)
  staffInfos: StaffInfoEntity[];

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt?: Date | null;
}
