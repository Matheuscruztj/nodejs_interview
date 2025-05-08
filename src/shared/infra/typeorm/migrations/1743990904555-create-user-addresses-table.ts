import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserAddressesTable1743990904555 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE user_addresses (
        id BIGSERIAL PRIMARY KEY,
        user_id BIGINT NOT NULL,
        street_address VARCHAR(255) NOT NULL,
        address_number VARCHAR(255) NOT NULL,
        address_complement VARCHAR(255),
        neighborhood VARCHAR(255) NOT NULL,
        zip_code VARCHAR(255) NOT NULL,
        city VARCHAR(255) NOT NULL,
        state VARCHAR(255) NOT NULL,
        country VARCHAR(255) NOT NULL,
        is_primary_address BOOLEAN DEFAULT FALSE,
        
        CONSTRAINT fk_user
            FOREIGN KEY (user_id)
            REFERENCES users(id)
      );

      -- Create an index for faster lookups by user_id
      CREATE INDEX idx_user_addresses_user_id ON user_addresses(user_id);

      -- Create an index for finding primary addresses efficiently
      CREATE INDEX idx_user_addresses_primary ON user_addresses(user_id, is_primary_address) 
      WHERE is_primary_address = TRUE;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP INDEX idx_user_addresses_primary;
      DROP INDEX idx_user_addresses_user_id;
      DROP TABLE user_addresses;
    `);
  }
}