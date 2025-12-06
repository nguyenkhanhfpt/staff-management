import { StaffInfoEntity } from '@database/entities/staff-info.entity';
import { StaffEntity } from '@database/entities/staff.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class StaffSeeder1764988644905 implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const staffFactory = factoryManager.get(StaffEntity);

    const staffs = await staffFactory.saveMany(10);
    console.info(`Inserted ${staffs.length} staff records!`);

    const staffInfoFactory = factoryManager.get(StaffInfoEntity);

    for (const staff of staffs) {
      const staffInfo = await staffInfoFactory.make({
        staff: staff,
      });
      await dataSource.getRepository(StaffInfoEntity).save(staffInfo);
    }
    console.info(`Inserted ${staffs.length} staff info records!`);
  }
}
