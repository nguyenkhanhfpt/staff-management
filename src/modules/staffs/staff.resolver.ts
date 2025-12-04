import { Staff } from '@models';
import { Resolver } from '@nestjs/graphql';
import { Query, Args, ID } from '@nestjs/graphql';
import { StaffsService } from './staffs.service';
import { GraphStaff } from '@decorators';
import { JwtPayload } from '@modules/auth/strategies/access-token.strategy';

@Resolver(() => Staff)
export class StaffsResolver {
  constructor(private readonly staffsService: StaffsService) {}

  @Query(() => [Staff], { name: 'staffs' })
  findAll() {
    return this.staffsService.findAll();
  }

  @Query(() => Staff, { name: 'staff', description: 'Get staff by ID' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.staffsService.findOne(id);
  }

  @Query(() => Staff, {
    name: 'me',
    description: 'Get current authenticated staff',
  })
  getCurrentStaff(@GraphStaff() staff: JwtPayload) {
    return this.staffsService.findOne(staff.id);
  }
}
