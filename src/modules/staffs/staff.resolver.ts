import { Staff } from '@models';
import { Resolver } from '@nestjs/graphql';
import { Query, Args, ID } from '@nestjs/graphql';
import { StaffsService } from './staffs.service';

@Resolver(() => Staff)
export class StaffsResolver {
  constructor(private readonly staffsService: StaffsService) {}

  @Query(() => [Staff], { name: 'staffs' })
  findAll() {
    return this.staffsService.findAll();
  }

  @Query(() => Staff, { name: 'staff' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.staffsService.findOne(id);
  }
}
