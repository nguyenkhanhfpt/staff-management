import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateStaffInfoDto } from './create-staff-info.dto';

export class UpdateStaffInfoDto extends PartialType(
  OmitType(CreateStaffInfoDto, ['staffId'] as const),
) {}
