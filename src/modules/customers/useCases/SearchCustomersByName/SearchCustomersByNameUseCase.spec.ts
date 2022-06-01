import { InMemoryCitiesRepository } from "@modules/cities/repositories/in-memory/InMemoryCitiesRepository";
import { CreateCityUseCase } from "@modules/cities/useCases/CreateCity/CreateCityUseCase";
import { InMemoryCustomersRepository } from "@modules/customers/repositories/in-memory/InMemoryCustomersRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementation/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";
import { currentDate, tomorrowDate } from "@shared/utils/DayJs";
import { CreateCustomerUseCase } from "../CreateCustomer/CreateCustomerUseCase";
import { SearchCustomersByNameUseCase } from "./SearchCustomersByNameUseCase";

let createCityUseCase: CreateCityUseCase;
let createCustomerUseCase: CreateCustomerUseCase;
let searchCustomersByNameUseCase: SearchCustomersByNameUseCase;
let inMemoryCitiesRepository: InMemoryCitiesRepository;
let inMemoryCustomersRepository: InMemoryCustomersRepository;
let dateProvider: IDateProvider;

describe("Search a customer", () => {
    beforeEach(() => {
        dateProvider = new DayjsDateProvider();
        inMemoryCitiesRepository = new InMemoryCitiesRepository();
        inMemoryCustomersRepository = new InMemoryCustomersRepository();

        createCityUseCase = new CreateCityUseCase(inMemoryCitiesRepository);
        createCustomerUseCase = new CreateCustomerUseCase(inMemoryCustomersRepository, inMemoryCitiesRepository, dateProvider);
        searchCustomersByNameUseCase = new SearchCustomersByNameUseCase(inMemoryCustomersRepository);
    });

    it("should be able to search a customer by name", async () => {
        const city = await createCityUseCase.execute({
            name: "Josephine Pratt",
            state: "CE"
        });

        const name = "Teresa Lamb";

        await createCustomerUseCase.execute({
            name,
            "gender": "male",
            "birth_date": currentDate(),
            "city": city.id
        });

        const list = await searchCustomersByNameUseCase.execute({
            name,
            page: 1,
            limit: 1,
        });

        expect(list.length).toBeGreaterThan(0);
    });

    it("should be able to search a customer by name if there is not a customer", async () => {
        const list = await searchCustomersByNameUseCase.execute({
            name: "Bryan Ingram",
            page: 1,
            limit: 1,
        });

        expect(list.length).toEqual(0);
    });
});