import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Department {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  shortName: string;

  @Field(() => Int, { nullable: true })
  parentId?: number;

  @Field(() => Department, { nullable: true })
  parent?: Department;

  @Field(() => [Department], { nullable: true })
  children?: Department[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  deletedAt?: Date;
}
