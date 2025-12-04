import { InputType, PartialType } from '@nestjs/graphql';
import { CreateOfficeInput } from './create-office.input';

@InputType()
export class UpdateOfficeInput extends PartialType(CreateOfficeInput) {}
