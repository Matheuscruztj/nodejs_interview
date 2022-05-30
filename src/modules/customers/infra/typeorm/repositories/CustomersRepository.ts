import { ICreateCustomerDTO } from "@modules/customers/dto/ICreateCustomerDTO";
import { ISearchByNameAndBirthDateAndCityIdDTO } from "@modules/customers/dto/ISearchByNameAndBirthDateAndCityIdDTO";
import { ISearchByNameDTO } from "@modules/customers/dto/ISearchByNameDTO";
import { ICustomersRepository } from "@modules/customers/repositories/ICustomersRepository";
import { getRepository, Repository } from "typeorm";
import { Customer } from "../entities/Customer";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

class CustomersRepository implements ICustomersRepository {
    private repository: Repository<Customer>;

    constructor() {
        this.repository = getRepository(Customer);
    }

    calculateAge(customer: Customer) {
        const currentDate = dayjs().toDate();

        customer.age = dayjs(currentDate).diff(customer.birthDate, "years");
    }
    
    async create({
        id,
        name,
        gender,
        birth_date,
        city_id,
    }: ICreateCustomerDTO): Promise<Customer> {
        let customer = await this.repository.create({
            id,
            name,
            gender,
            birthDate: birth_date,
            cityId: city_id,
        });

        this.calculateAge(customer);

        return this.repository.save(customer);
    }

    async searchById(id: string): Promise<Customer> {
        let customer = await this.repository.findOne(id, {
            relations: ['city']
        });

        this.calculateAge(customer);

        return customer;
    }

    async searchByName({
        name,
        page,
        limit
    }: ISearchByNameDTO): Promise<Customer[]> {
        const nameSanitized = name ? `%${name.toString().toLowerCase()}%` : null;

        let customers = await this.repository.createQueryBuilder('customers')
            .innerJoinAndSelect("customers.city", "city")
            .where("LOWER(customers.name) like :name", {
                name: `%${nameSanitized}%`,
            })
            .orderBy("customers.created_at", "ASC")
            .limit(limit)
            .offset((page - 1) * limit)
            .getMany();
        
        customers.forEach(customer => {
            this.calculateAge(customer);
        });

        return customers;
    }

    async searchByNameAndBirthDateAndCityId({
        name,
        birth_date,
        city_id
    }: ISearchByNameAndBirthDateAndCityIdDTO): Promise<Customer> {
        const nameSanitized = name ? `%${name.toString().toLowerCase()}%` : null;

        const customers = await this.repository.createQueryBuilder('customers')
            .where("LOWER(customers.name) like :name", {
                name: `%${nameSanitized}%`,
            })
            .andWhere("customers.birth_date = :date", {
                date: birth_date,
            })
            .andWhere("customers.city_id = :city_id", {
                city_id,
            })
            .orderBy("customers.created_at", "ASC")
            .getMany();
        
        if(customers.length)
            return customers[0];
    }

    async updateNameById(name: string, id: string): Promise<Customer> {
        await this.repository.createQueryBuilder().update().set({
            name
          }).where("id = :id").setParameters({
            id
          }).execute();

        let customer = await this.repository.findOne(id);

        this.calculateAge(customer);

        return customer;
    }

    async deleteById(id: string): Promise<void> {
        await this.repository.createQueryBuilder().delete().where("id = :id").setParameters({
            id
        }).execute();
    }
}

export { CustomersRepository };
