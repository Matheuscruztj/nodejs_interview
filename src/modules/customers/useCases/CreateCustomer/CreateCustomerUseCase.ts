import "reflect-metadata";

import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { ICustomersRepository } from "@modules/customers/repositories/ICustomersRepository";
import { Customer } from "@modules/customers/infra/typeorm/entities/Customer";
import { GenderTypeEnum } from "@modules/customers/enum/GenderTypeEnum";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import dayjs from "dayjs";
import { ICitiesRepository } from "@modules/cities/repositories/ICitiesRepository";

interface IRequest {
    name: string;
    gender: string;
    birth_date: string;
    city: string;
}

@injectable()
class CreateCustomerUseCase {
    constructor(
        @inject("CustomersRepository")
        private customersRepository: ICustomersRepository,
        @inject("CitiesRepository")
        private citiesRepository: ICitiesRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) {}

    async execute({
        name,
        gender,
        birth_date,
        city,
    }: IRequest): Promise<Customer> {
        if (!((<any>Object).values(GenderTypeEnum).includes(gender.toLocaleLowerCase())))
            throw new AppError("Gender not allowed");

        const genderType = gender.toLocaleLowerCase() as GenderTypeEnum;

        const currentDate = this.dateProvider.dateNow();
        const dateAdjust = this.dateProvider.convertStringToUtc(birth_date);

        if (this.dateProvider.compareIfAfter( dateAdjust, currentDate)) 
           throw new AppError("Date invalid"); 
        
        const cityExists = await this.citiesRepository.searchById(city);

        if (!cityExists)
            throw new AppError("City not exists");
        
        const customerAlreadyExists = await this.customersRepository.searchByNameAndBirthDateAndCityId({
            name,
            birth_date: dateAdjust,
            city_id: city
        });

        if (customerAlreadyExists) 
            throw new AppError("Customer already exists");

        const customer = await this.customersRepository.create({
            name,
            gender: genderType,
            birth_date: dateAdjust,
            city_id: city
        });

        return customer;
    }
}

export { CreateCustomerUseCase };