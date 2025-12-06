import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DepartmentSeeder1764689279795 } from './department-seeder';
import { OfficeSeeder1764687820720 } from './office-seeder';
import { StaffSeeder1764988644905 } from './staff-seeder';

export class MasterSeeder1764689435450 implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    await new OfficeSeeder1764687820720().run(dataSource);
    await new DepartmentSeeder1764689279795().run(dataSource);
    await new StaffSeeder1764988644905().run(dataSource, factoryManager);
  }
}
