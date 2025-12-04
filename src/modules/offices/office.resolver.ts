import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Office } from '@models';
import { OfficeResolverService } from './office-resolver.service';
import { CreateOfficeInput } from './dto/create-office.input';
import { UpdateOfficeInput } from './dto/update-office.input';

@Resolver(() => Office)
export class OfficeResolver {
  constructor(private readonly officeResolverService: OfficeResolverService) {}

  @Query(() => [Office], {
    name: 'offices',
    description: 'Get all offices',
  })
  async findAll() {
    return this.officeResolverService.findAll();
  }

  @Query(() => Office, {
    name: 'office',
    description: 'Get office by ID',
  })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.officeResolverService.findOne(id);
  }

  @Mutation(() => Office, {
    description: 'Create a new office',
  })
  async createOffice(@Args('input') createOfficeInput: CreateOfficeInput) {
    return this.officeResolverService.create(createOfficeInput);
  }

  @Mutation(() => Office, {
    description: 'Update an office',
  })
  async updateOffice(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') updateOfficeInput: UpdateOfficeInput,
  ) {
    return this.officeResolverService.update(id, updateOfficeInput);
  }

  @Mutation(() => String, {
    description: 'Delete an office',
  })
  async deleteOffice(@Args('id', { type: () => Int }) id: number) {
    return this.officeResolverService.remove(id);
  }
}
