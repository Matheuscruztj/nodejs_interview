import { IUpdateDTO } from "@modules/customers/dto/IUpdateDTO";
import { Customer } from "@modules/customers/infra/typeorm/entities/Customer";
import { ICustomersRepository } from "@modules/customers/repositories/ICustomersRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import validate from "uuid-validate";

@injectable()
class ChangeCustomerNameUseCase {
    constructor(
        @inject("CustomersRepository")
        private customersRepository: ICustomersRepository
    ) {}

    async execute({
        id,
        name
    }: IUpdateDTO): Promise<Customer> {
        if(!validate(id))
            throw new AppError("Invalid id");

        let customer = await this.customersRepository.searchById(id);

        if (!customer)
            throw new AppError("Customer not exists");

        if (customer.name === name)
            throw new AppError("Name is already the same");

        const newCustomerAlreadyExists = await this.customersRepository.searchByNameAndBirthDateAndCityId({
            name,
            birth_date: customer.birthDate,
            city_id: customer.cityId,
        });

        if (newCustomerAlreadyExists)
            throw new AppError("Name is not available");

        const customerWithNewName = await this.customersRepository.updateNameById(name, customer.id);

        return customerWithNewName;
    }
}

export { ChangeCustomerNameUseCase };