import { Customer } from "@modules/customers/infra/typeorm/entities/Customer";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("cities")
class City {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    state: string;

    @OneToMany(() => Customer, customer => customer.city)
    customers: Customer[];

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { City };