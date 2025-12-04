import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Office {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  location?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
