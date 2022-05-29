import { ISearchByNameDTO } from "@modules/cities/dto/ISearchByNameDTO";
import { Customer } from "@modules/customers/infra/typeorm/entities/Customer";
import { ICustomersRepository } from "@modules/customers/repositories/ICustomersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class SearchCustomersByNameUseCase {
    constructor(
        @inject("CustomersRepository")
        private customersRepository: ICustomersRepository
    ) {}

    async execute({
        name,
        page = 1,
        limit = 10
    }: ISearchByNameDTO): Promise<Customer[]> {
        const customers = await this.customersRepository.searchByName({
            name,
            page,
            limit,
        });

        return customers;
    }
}

export { SearchCustomersByNameUseCase };
