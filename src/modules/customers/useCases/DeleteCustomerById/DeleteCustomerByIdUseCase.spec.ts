import { InMemoryCitiesRepository } from "@modules/cities/repositories/in-memory/InMemoryCitiesRepository";
import { CreateCityUseCase } from "@modules/cities/useCases/CreateCity/CreateCityUseCase";
import { InMemoryCustomersRepository } from "@modules/customers/repositories/in-memory/InMemoryCustomersRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementation/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";
import { currentDate, tomorrowDate } from "@shared/utils/DayJs";
import { CreateCustomerUseCase } from "../CreateCustomer/CreateCustomerUseCase";
import { DeleteCustomerByIdUseCase } from "./DeleteCustomerByIdUseCase";

let createCityUseCase: CreateCityUseCase;
let createCustomerUseCase: CreateCustomerUseCase;
let deleteCustomerByIdUseCase: DeleteCustomerByIdUseCase;
let inMemoryCitiesRepository: InMemoryCitiesRepository;
let inMemoryCustomersRepository: InMemoryCustomersRepository;
let dateProvider: IDateProvider;

describe("Delete customer by id", () => {
    beforeEach(() => {
        dateProvider = new DayjsDateProvider();
        inMemoryCitiesRepository = new InMemoryCitiesRepository();
        inMemoryCustomersRepository = new InMemoryCustomersRepository();

        createCityUseCase = new CreateCityUseCase(inMemoryCitiesRepository);
        createCustomerUseCase = new CreateCustomerUseCase(inMemoryCustomersRepository, inMemoryCitiesRepository, dateProvider);
        deleteCustomerByIdUseCase = new DeleteCustomerByIdUseCase(inMemoryCustomersRepository);
    });

    it("should be able to delete a customer by id", async() => {
        const city = await createCityUseCase.execute({
            name: "Edith Graham",
            state: "CE"
        });

        const customer = await createCustomerUseCase.execute({
            name: "Bessie Fletcher",
            gender: "male",
            birth_date: currentDate(),
            city: city.id
        });

        const spy = jest.spyOn(deleteCustomerByIdUseCase, "execute");

        await deleteCustomerByIdUseCase.execute(customer.id);

        expect(spy).toHaveBeenCalled();
    });

    it("should not be able to delete a customer if the id is invalid", async () => {
        await expect(
            deleteCustomerByIdUseCase.execute("123"),
        ).rejects.toEqual(
            new AppError("Invalid id"),
        );
    });

    it("should not be able to delete a customer if the id not exists", async () => {
        await expect(
            deleteCustomerByIdUseCase.execute("49c69c66-e4e7-4e8f-8664-92e5c6bdd18d"),
        ).rejects.toEqual(
            new AppError("Customer not exists"),
        );
    });
});