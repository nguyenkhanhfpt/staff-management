import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Staff {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;
}
