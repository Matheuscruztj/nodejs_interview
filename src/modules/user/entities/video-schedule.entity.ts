import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Video } from './video.entity';

@Entity('video_schedules')
export class VideoSchedule {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number;

  @Column({ name: 'user_id', type: 'bigint' })
  userId!: number;

  @Column({ name: 'video_id', type: 'bigint' })
  videoId!: number;

  @Column({ name: 'appointment_date', type: 'timestamp' })
  appointmentDate!: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt!: Date;

  @ManyToOne(() => User, (user) => user.videoSchedules)
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @ManyToOne(() => Video, (video) => video.videoSchedules)
  @JoinColumn({ name: 'video_id' })
  video?: Video;
}
