import { Field, ID, ObjectType } from '@nestjs/graphql';
import { StaffInfo } from './staff-info.model';

@ObjectType()
export class Staff {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field(() => StaffInfo)
  staffInfo?: StaffInfo | null;
}
