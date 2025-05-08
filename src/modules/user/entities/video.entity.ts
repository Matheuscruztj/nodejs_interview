import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { VideoSchedule } from './video-schedule.entity';

@Entity('videos')
export class Video {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number;

  @Column({ name: 'video_id', unique: true })
  videoId!: string;

  @Column({ name: 'video_description' })
  videoDescription!: string;

  @Column({ name: 'question_layout_id' })
  questionLayoutId!: string;

  @Column({ name: 'temporary_location' })
  temporaryLocation!: string;

  @Column({ name: 'final_location', nullable: true })
  finalLocation!: string;

  @Column({ name: 'external_id', nullable: true })
  externalId!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt!: Date;

  @Column({ name: 'removed_by_system', default: false })
  removedBySystem!: boolean;

  @Column({ name: 'removed_by_user', default: false })
  removedByUser!: boolean;

  @OneToMany(() => VideoSchedule, (videoSchedule) => videoSchedule.video)
  videoSchedules?: VideoSchedule[];
}
