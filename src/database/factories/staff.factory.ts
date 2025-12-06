import { setSeederFactory } from 'typeorm-extension';
import { StaffEntity } from '@database/entities/staff.entity';
import { hashPassword } from '@shared/utils';

export const staffFactory = setSeederFactory(StaffEntity, async (faker) => {
  const staff = new StaffEntity();
  staff.name = faker.person.fullName();
  staff.email = faker.internet.email();
  staff.password = await hashPassword('123456');

  return staff;
});
