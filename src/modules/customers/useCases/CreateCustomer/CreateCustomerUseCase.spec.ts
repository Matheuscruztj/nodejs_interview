import dayjs from "dayjs";

import { InMemoryCitiesRepository } from "@modules/cities/repositories/in-memory/InMemoryCitiesRepository";
import { CreateCityUseCase } from "@modules/cities/useCases/CreateCity/CreateCityUseCase";
import { InMemoryCustomersRepository } from "@modules/customers/repositories/in-memory/InMemoryCustomersRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementation/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";
import { CreateCustomerUseCase } from "./CreateCustomerUseCase";
import { currentDate, tomorrowDate } from "@shared/utils/DayJs";

let createCityUseCase: CreateCityUseCase;
let createCustomerUseCase: CreateCustomerUseCase;
let inMemoryCitiesRepository: InMemoryCitiesRepository;
let inMemoryCustomersRepository: InMemoryCustomersRepository;
let dateProvider: IDateProvider;

describe("Create city", () => {
    beforeEach(() => {
        dateProvider = new DayjsDateProvider();
        inMemoryCitiesRepository = new InMemoryCitiesRepository();
        inMemoryCustomersRepository = new InMemoryCustomersRepository();

        createCityUseCase = new CreateCityUseCase(inMemoryCitiesRepository);
        createCustomerUseCase = new CreateCustomerUseCase(inMemoryCustomersRepository, inMemoryCitiesRepository, dateProvider);
    });

    it("should be able to create a customer", async () => {
        const city = await createCityUseCase.execute({
            name: "Callie Porter",
            state: "CE"
        });

        const customer = await createCustomerUseCase.execute({
            "name": "Essie Tucker",
            "gender": "male",
            "birth_date": currentDate(),
            "city": city.id
        });

        expect(customer).toHaveProperty("id");
    });

    it("should not be able to create a customer if the customer already exists", async () => {
        const city = await createCityUseCase.execute({
            name: "Callie Porter",
            state: "CE"
        });

        await createCustomerUseCase.execute({
            "name": "Margaret Wagner",
            "gender": "male",
            "birth_date": currentDate(),
            "city": city.id
        });

        await expect(
            createCustomerUseCase.execute({
                "name": "Margaret Wagner",
                "gender": "male",
                "birth_date": currentDate(),
                "city": city.id
            }),
        ).rejects.toEqual(
            new AppError("Customer already exists"),
        );
    });

    it("should not be able to create a customer if the gender is not allowed", async () => {
        await expect(
            createCustomerUseCase.execute({
                "name": "Essie Tucker",
                "gender": "test",
                "birth_date": currentDate(),
                "city": "ABC"
            })
        ).rejects.toEqual(
            new AppError("Gender not allowed"),
        );
    });

    it("should not be able to create a customer if the date is in the future", async () => {
        await expect(
            createCustomerUseCase.execute({
                "name": "Essie Tucker",
                "gender": "male",
                "birth_date": tomorrowDate(),
                "city": "ABC"
            })
        ).rejects.toEqual(
            new AppError("Date invalid"),
        );
    });

    it("should not be able to create a customer if there is not a city", async () => {
        await expect(
            createCustomerUseCase.execute({
                "name": "Essie Tucker",
                "gender": "male",
                "birth_date": currentDate(),
                "city": "AB"
            })
        ).rejects.toEqual(
            new AppError("City not exists"),
        );
    });
});