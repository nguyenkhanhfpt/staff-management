import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateStaffAndPostTables1764859469170
  implements MigrationInterface
{
  name = 'UpdateStaffAndPostTables1764859469170';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "posts" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "staffs" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "staffs" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "staffs" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "staffs" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "created_at"`);
  }
}
