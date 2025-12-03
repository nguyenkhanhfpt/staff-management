import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import * as csv from 'csv-parser';
import * as fs from 'fs';
import * as path from 'path';
import { DepartmentEntity } from '@database/entities/department.entity';

export class DepartmentSeeder1764689279795 implements Seeder {
  track = false;

  public async run(dataSource: DataSource): Promise<any> {
    const filePath = path.resolve(__dirname, 'master', 'departments.csv');

    if (!fs.existsSync(filePath)) {
      console.error(`File ${filePath} not found!`);
      return;
    }

    const chunkSize = 100;
    const csvData = await this.readCsvFile(filePath);
    const repository = dataSource.getRepository(DepartmentEntity);

    for (let i = 0; i < csvData.length; i += chunkSize) {
      const chunkData = csvData.slice(i, i + chunkSize);
      await repository.save(chunkData);

      console.info(`Inserted ${chunkData.length} department records!`);
    }
  }

  /**
   * Read CSV
   * @param filePath
   * @private
   */
  private async readCsvFile(filePath: string): Promise<any> {
    const results: any[] = [];

    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => {
          results.push({
            id: parseInt(data.id, 10),
            name: data.name,
            shortName: data.shortName,
            parentId: data.parentId ? parseInt(data.parentId, 10) : null,
          });
        })
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error));
    });
  }
}
