import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateStaffTable1765185813764 implements MigrationInterface {
  name = 'UpdateStaffTable1765185813764';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."staffs_status_enum" AS ENUM('active', 'inactive', 'terminated')`,
    );
    await queryRunner.query(
      `ALTER TABLE "staffs" ADD "status" "public"."staffs_status_enum" NOT NULL DEFAULT 'active'`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."staffs_role_enum" AS ENUM('admin', 'manager', 'leader', 'employee', 'intern')`,
    );
    await queryRunner.query(
      `ALTER TABLE "staffs" ADD "role" "public"."staffs_role_enum" NOT NULL DEFAULT 'employee'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "staffs" DROP COLUMN "role"`);
    await queryRunner.query(`DROP TYPE "public"."staffs_role_enum"`);
    await queryRunner.query(`ALTER TABLE "staffs" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."staffs_status_enum"`);
  }
}
