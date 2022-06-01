import { Customer } from "@modules/customers/infra/typeorm/entities/Customer";
import { ICustomersRepository } from "@modules/customers/repositories/ICustomersRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import validate from "uuid-validate";

@injectable()
class DeleteCustomerByIdUseCase {
    constructor(
        @inject("CustomersRepository")
        private customersRepository: ICustomersRepository
    ) {}

    async execute(id: string): Promise<void> {
        if(!validate(id))
            throw new AppError("Invalid id");

        const customer = await this.customersRepository.searchById(id);

        if (!customer)
            throw new AppError("Customer not exists");
        
        await this.customersRepository.deleteById(id);
    }
}

export { DeleteCustomerByIdUseCase };