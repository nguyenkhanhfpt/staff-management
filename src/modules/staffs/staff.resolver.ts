import { Staff } from '@models';
import { Resolver } from '@nestjs/graphql';
import { Query, Args, ID } from '@nestjs/graphql';
import { StaffResolverService } from './staff-resolver.service';

@Resolver(() => Staff)
export class StaffsResolver {
  constructor(private readonly staffResolverService: StaffResolverService) {}

  @Query(() => [Staff], { name: 'staffs' })
  findAll() {
    return this.staffResolverService.findAll();
  }

  @Query(() => Staff, { name: 'staff', description: 'Get staff by ID' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.staffResolverService.findOne(id);
  }
}
