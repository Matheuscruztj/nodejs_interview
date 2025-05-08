import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateVideosTable1743991124753 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE videos (
        id BIGSERIAL PRIMARY KEY,
        video_id VARCHAR(255) UNIQUE NOT NULL,
        video_description TEXT NOT NULL,
        question_layout_id VARCHAR(255) NOT NULL,
        temporary_location TEXT NOT NULL,
        final_location TEXT,
        external_id VARCHAR(255),
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP,
        removed_by_system BOOLEAN NOT NULL DEFAULT FALSE,
        removed_by_user BOOLEAN NOT NULL DEFAULT FALSE
      );

      -- Create index for unique video_id for faster lookup
      CREATE UNIQUE INDEX idx_video_video_id ON videos(video_id);

      -- Create index for soft deletes
      CREATE INDEX idx_video_deleted_at ON videos(deleted_at) 
      WHERE deleted_at IS NULL;

      -- Create indexes for removal flags
      CREATE INDEX idx_video_removal_flags ON videos(removed_by_system, removed_by_user);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP INDEX idx_video_removal_flags;
      DROP INDEX idx_video_deleted_at;
      DROP INDEX idx_video_video_id;
      DROP TABLE videos;
    `);
  }
}