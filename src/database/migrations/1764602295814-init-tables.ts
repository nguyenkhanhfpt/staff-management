import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitTables1764602295814 implements MigrationInterface {
  name = 'InitTables1764602295814';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "posts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "content" text NOT NULL, "staff_id" uuid NOT NULL, "deleted_at" TIMESTAMP, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "offices" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "location" character varying, "deleted_at" TIMESTAMP, CONSTRAINT "PK_1ea41502c6dddcec44ad9fcbbb3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "staff_info" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "staff_id" uuid NOT NULL, "avatar" character varying, "phone" character varying, "address" character varying, "tax_code" character varying, "start_date" date, "date_of_birth" date, "nationality" character varying, "notes" text, "office_id" integer, CONSTRAINT "UQ_640d024ffd1e9d0a49e87e8c52c" UNIQUE ("staff_id"), CONSTRAINT "REL_640d024ffd1e9d0a49e87e8c52" UNIQUE ("staff_id"), CONSTRAINT "PK_3b24c57d8ea36582e83d419a15d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "staffs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "deleted_at" TIMESTAMP, CONSTRAINT "PK_f3fec5e06209b46afdf8accf117" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "departments" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "short_name" character varying NOT NULL, "parent_id" integer, "deleted_at" TIMESTAMP, CONSTRAINT "PK_839517a681a86bb84cbcc6a1e9d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "staff_departments" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "staff_id" uuid NOT NULL, "department_id" integer NOT NULL, "is_default" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_0cb4f936c7b2fe29ebb0eeb3bd8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts" ADD CONSTRAINT "FK_25993a2a36057366e469e12aa25" FOREIGN KEY ("staff_id") REFERENCES "staffs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff_info" ADD CONSTRAINT "FK_640d024ffd1e9d0a49e87e8c52c" FOREIGN KEY ("staff_id") REFERENCES "staffs"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff_info" ADD CONSTRAINT "FK_abeca7cb0b114efc48203dd0b98" FOREIGN KEY ("office_id") REFERENCES "offices"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "departments" ADD CONSTRAINT "FK_700b0b13f494cb37b6ca929e79b" FOREIGN KEY ("parent_id") REFERENCES "departments"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff_departments" ADD CONSTRAINT "FK_584a6ed656f4acb08b9820f7b53" FOREIGN KEY ("staff_id") REFERENCES "staffs"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff_departments" ADD CONSTRAINT "FK_03b7bec36d08ea7f240de822bc9" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "staff_departments" DROP CONSTRAINT "FK_03b7bec36d08ea7f240de822bc9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff_departments" DROP CONSTRAINT "FK_584a6ed656f4acb08b9820f7b53"`,
    );
    await queryRunner.query(
      `ALTER TABLE "departments" DROP CONSTRAINT "FK_700b0b13f494cb37b6ca929e79b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff_info" DROP CONSTRAINT "FK_abeca7cb0b114efc48203dd0b98"`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff_info" DROP CONSTRAINT "FK_640d024ffd1e9d0a49e87e8c52c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts" DROP CONSTRAINT "FK_25993a2a36057366e469e12aa25"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "staff_departments"`);
    await queryRunner.query(`DROP TABLE "departments"`);
    await queryRunner.query(`DROP TABLE "staffs"`);
    await queryRunner.query(`DROP TABLE "staff_info"`);
    await queryRunner.query(`DROP TABLE "offices"`);
    await queryRunner.query(`DROP TABLE "posts"`);
  }
}
