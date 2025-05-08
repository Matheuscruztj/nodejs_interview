import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateVideoSchedulesTable1743991162311 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE video_schedules (
        id BIGSERIAL PRIMARY KEY,
        user_id BIGINT NOT NULL,
        video_id BIGINT NOT NULL,
        appointment_date TIMESTAMP NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP,
        
        CONSTRAINT fk_user
            FOREIGN KEY (user_id)
            REFERENCES users(id),
            
        CONSTRAINT fk_video
            FOREIGN KEY (video_id)
            REFERENCES videos(id)
      );

      -- Create indexes for foreign keys to improve performance
      CREATE INDEX idx_video_schedules_user_id ON video_schedules(user_id);
      CREATE INDEX idx_video_schedules_video_id ON video_schedules(video_id);

      -- Create index for searching appointments
      CREATE INDEX idx_video_schedules_appointment_date ON video_schedules(appointment_date);

      -- Create index for soft deletes
      CREATE INDEX idx_video_schedules_deleted_at ON video_schedules(deleted_at) 
      WHERE deleted_at IS NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP INDEX idx_video_schedules_deleted_at;
      DROP INDEX idx_video_schedules_appointment_date;
      DROP INDEX idx_video_schedules_video_id;
      DROP INDEX idx_video_schedules_user_id;
      DROP TABLE video_schedules;
    `);
  }
}