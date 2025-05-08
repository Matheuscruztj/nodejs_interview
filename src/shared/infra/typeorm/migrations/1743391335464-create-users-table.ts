import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1743391335464 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" BIGSERIAL PRIMARY KEY,
        "name" VARCHAR NOT NULL,
        "whatsapp_number" VARCHAR,
        "instagram" VARCHAR,
        "email" VARCHAR NOT NULL UNIQUE,
        "birth_date" DATE,
        "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "deleted_at" TIMESTAMP,
        "password" VARCHAR(255)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "users"');
  }
}
