import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { OfficeEntity } from '@database/entities/office.entity';
import * as csv from 'csv-parser';
import * as fs from 'fs';
import * as path from 'path';

export class OfficeSeeder1764687820720 implements Seeder {
  track = false;

  public async run(dataSource: DataSource): Promise<any> {
    const filePath = path.resolve(__dirname, 'master', 'offices.csv');

    if (!fs.existsSync(filePath)) {
      console.error(`File ${filePath} not found!`);
      return;
    }

    const chunkSize = 100;
    const csvData = await this.readCsvFile(filePath);
    const repository = dataSource.getRepository(OfficeEntity);

    for (let i = 0; i < csvData.length; i += chunkSize) {
      const chunkData = csvData.slice(i, i + chunkSize);
      await repository.save(chunkData);
      console.info(`Inserted ${chunkData.length} office records!`);
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
            location: data.location,
          });
        })
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error));
    });
  }
}
