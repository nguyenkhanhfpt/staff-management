import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Staff } from './staff.model';

@ObjectType()
export class Post {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field(() => ID)
  staffId: string;

  @Field(() => Staff)
  staff?: Staff;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
