import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('user_addresses')
export class UserAddress {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number;

  @Column({ name: 'user_id', type: 'bigint' })
  userId!: number;

  @Column({ name: 'street_address' })
  streetAddress!: string;

  @Column({ name: 'address_number' })
  addressNumber!: string;

  @Column({ name: 'address_complement', nullable: true })
  addressComplement!: string;

  @Column()
  neighborhood!: string;

  @Column({ name: 'zip_code' })
  zipCode!: string;

  @Column()
  city!: string;

  @Column()
  state!: string;

  @Column()
  country!: string;

  @Column({ name: 'is_primary_address', default: false })
  isPrimaryAddress!: boolean;

  @ManyToOne(() => User, (user) => user.addresses)
  @JoinColumn({ name: 'user_id' })
  user?: User;
}
