import { setSeederFactory } from 'typeorm-extension';
import { StaffInfoEntity } from '@database/entities/staff-info.entity';
import { getRandomStaffAvatar } from '@shared/utils';

export const staffInfoFactory = setSeederFactory(
  StaffInfoEntity,
  async (faker) => {
    const staffInfo = new StaffInfoEntity();
    staffInfo.avatar = getRandomStaffAvatar();
    staffInfo.address = faker.location.streetAddress();
    staffInfo.phone = faker.phone.number();
    staffInfo.taxCode = faker.string.alphanumeric(10);
    staffInfo.startDate = faker.date.past({ years: 5 });
    staffInfo.dateOfBirth = faker.date.past({
      years: 30,
      refDate: '2000-01-01',
    });
    staffInfo.nationality = faker.location.country();
    staffInfo.notes = faker.lorem.sentence();

    return staffInfo;
  },
);
