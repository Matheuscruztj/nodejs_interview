import { ICreateCustomerDTO } from "../dto/ICreateCustomerDTO";
import { ISearchByNameAndBirthDateAndCityIdDTO } from "../dto/ISearchByNameAndBirthDateAndCityIdDTO";
import { ISearchByNameDTO } from "../dto/ISearchByNameDTO";
import { Customer } from "../infra/typeorm/entities/Customer";

interface ICustomersRepository {
    create(data: ICreateCustomerDTO): Promise<Customer>;
    searchById(id: string): Promise<Customer>;
    searchByName(data: ISearchByNameDTO): Promise<Customer[]>;
    searchByNameAndBirthDateAndCityId(data: ISearchByNameAndBirthDateAndCityIdDTO): Promise<Customer>;
    updateNameById(name: string, id: string): Promise<Customer>;
    deleteById(id: string): Promise<void>;
}

export { ICustomersRepository };
