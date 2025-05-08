import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUpdateTriggers1743991251943 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TRIGGER update_video_schedules_modtime
      BEFORE UPDATE ON video_schedules
      FOR EACH ROW
      EXECUTE FUNCTION update_modified_column();

      CREATE TRIGGER update_videos_modtime
      BEFORE UPDATE ON videos
      FOR EACH ROW
      EXECUTE FUNCTION update_modified_column();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TRIGGER IF EXISTS update_videos_modtime ON videos;
      DROP TRIGGER IF EXISTS update_video_schedules_modtime ON video_schedules;
    `);
  }
}