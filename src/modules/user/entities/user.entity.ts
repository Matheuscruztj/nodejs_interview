import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { UserAddress } from './user-address.entity';
import { VideoSchedule } from './video-schedule.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number;

  @Column({ name: 'name' })
  name!: string;

  @Column({ name: 'whatsapp_number', type: 'varchar', nullable: true })
  whatsapp_number!: string | null;

  @Column({ nullable: true, type: 'varchar' })
  instagram!: string | null;

  @Column({ unique: true, type: 'varchar' })
  email!: string | null;

  @Column({ name: 'birth_date', type: 'date', nullable: true })
  birth_date!: Date;

  @CreateDateColumn({ name: 'created_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  created_at!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updated_at!: Date;

  @Column({ nullable: true, type: 'varchar' })
  password!: string | null;

  @OneToMany(() => UserAddress, (userAddress) => userAddress.user)
  addresses?: UserAddress[];

  @OneToMany(() => VideoSchedule, (videoSchedule) => videoSchedule.user)
  videoSchedules?: VideoSchedule[];
}
