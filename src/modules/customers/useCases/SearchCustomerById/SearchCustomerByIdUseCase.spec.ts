import { InMemoryCitiesRepository } from "@modules/cities/repositories/in-memory/InMemoryCitiesRepository";
import { CreateCityUseCase } from "@modules/cities/useCases/CreateCity/CreateCityUseCase";
import { InMemoryCustomersRepository } from "@modules/customers/repositories/in-memory/InMemoryCustomersRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementation/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";
import { currentDate, tomorrowDate } from "@shared/utils/DayJs";
import { SearchCustomerByIdUseCase } from "./SearchCustomerByIdUseCase";
import { CreateCustomerUseCase } from "../CreateCustomer/CreateCustomerUseCase";

let createCityUseCase: CreateCityUseCase;
let createCustomerUseCase: CreateCustomerUseCase;
let searchCustomerByIdUseCase: SearchCustomerByIdUseCase;
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
        searchCustomerByIdUseCase = new SearchCustomerByIdUseCase(inMemoryCustomersRepository);
    });

    it("should be able to search a customer by id", async () => {
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

        const list = await searchCustomerByIdUseCase.execute(customer.id);

        expect(list).toHaveProperty("id");
    });

    it("should not be able to search a customer by id if city is invalid", async () => {
        await expect(
            searchCustomerByIdUseCase.execute("123")
        ).rejects.toEqual(
            new AppError("Invalid id"),
        );
    });

    it("should not be able to search a customer by id if customer not exists", async () => {
        await expect(
            searchCustomerByIdUseCase.execute("d7a4ffca-55b8-41cd-ba89-037d424dca46")
        ).rejects.toEqual(
            new AppError("Customer not exists"),
        );
    });
});