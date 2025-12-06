import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Staff } from './staff.model';

@ObjectType()
export class StaffInfo {
  @Field(() => ID)
  id: string;

  @Field()
  staffId: string;

  @Field()
  avatar?: string | null;

  @Field()
  phone?: string | null;

  @Field()
  address?: string | null;

  @Field()
  taxCode?: string | null;

  @Field()
  startDate?: string | null;

  @Field()
  dateOfBirth?: string | null;

  @Field()
  nationality?: string | null;

  @Field()
  notes?: string | null;

  @Field()
  officeId?: number | null;

  @Field(() => Staff)
  staff: Staff;
}
