import { City } from "@modules/cities/infra/typeorm/entities/City";
import { GenderTypeEnum } from "@modules/customers/enum/GenderTypeEnum";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("customers")
class Customer {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ type: 'enum', enum: GenderTypeEnum })
    gender: GenderTypeEnum;

    @Column({ name: 'birth_date' })
    birthDate: Date;

    age: number;

    @Column({ name: 'city_id' })
    cityId: string;

    @ManyToOne(() => City, city => city.customers)
    @JoinColumn({ name: 'city_id' })
    city: City;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { Customer };