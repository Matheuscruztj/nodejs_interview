import { ICreateCustomerDTO } from "@modules/customers/dto/ICreateCustomerDTO";
import { ISearchByNameAndBirthDateAndCityIdDTO } from "@modules/customers/dto/ISearchByNameAndBirthDateAndCityIdDTO";
import { ISearchByNameDTO } from "@modules/customers/dto/ISearchByNameDTO";
import { Customer } from "@modules/customers/infra/typeorm/entities/Customer";
import { ICustomersRepository } from "../ICustomersRepository";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

class InMemoryCustomersRepository implements ICustomersRepository {
    customers: Customer[] = [];

    calculateAge(customer: Customer) {
        const currentDate = dayjs().toDate();

        customer.age = dayjs(currentDate).diff(customer.birthDate, "years");
    }

    async create({
        name,
        gender,
        birth_date,
        city_id,
    }: ICreateCustomerDTO): Promise<Customer> {
        const customer = new Customer();

        await Object.assign(customer, {
            name,
            gender,
            birthDate: birth_date,
            cityId: city_id
        });

        await this.customers.push(customer);

        return customer;
    }

    async searchById(id: string): Promise<Customer> {
        let customer = await this.customers.find(customer => {
            if (customer.id === id)
                return customer;
        });

        if (customer)
            this.calculateAge(customer);

        return customer;
    }

    async searchByName({
        name,
    }: ISearchByNameDTO): Promise<Customer[]> {
        let customers = await this.customers.filter(customer => {
            if (customer.name === name)
                return customer;
        });

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
        const customer = await this.customers.find(customer => {
            if (customer.name.toLocaleLowerCase() === name.toString().toLowerCase() 
                && customer.birthDate.toISOString() == birth_date.toISOString() 
                && customer.cityId === city_id) {
                return customer;
            }
        });

        return customer;
    }

    async updateNameById(name: string, id: string): Promise<Customer> {
        const index = await this.customers.findIndex(customer => {
            if (customer.id === id)
                return customer;
        });

        this.customers[index].name = name;

        return this.customers[index];
    }

    async deleteById(id: string): Promise<void> {
        const index = await this.customers.findIndex(customer => {
            if (customer.id === id)
                return customer;
        });

        await this.customers.slice(index, 1);
    }
}

export { InMemoryCustomersRepository };
