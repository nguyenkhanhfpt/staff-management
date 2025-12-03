import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { DepartmentSeeder1764689279795 } from './department-seeder';
import { OfficeSeeder1764687820720 } from './office-seeder';

export class MasterSeeder1764689435450 implements Seeder {
  track = false;

  public async run(dataSource: DataSource): Promise<any> {
    await new OfficeSeeder1764687820720().run(dataSource);
    await new DepartmentSeeder1764689279795().run(dataSource);
  }
}
