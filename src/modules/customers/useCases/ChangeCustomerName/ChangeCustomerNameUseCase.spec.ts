import { InMemoryCitiesRepository } from "@modules/cities/repositories/in-memory/InMemoryCitiesRepository";
import { CreateCityUseCase } from "@modules/cities/useCases/CreateCity/CreateCityUseCase";
import { InMemoryCustomersRepository } from "@modules/customers/repositories/in-memory/InMemoryCustomersRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementation/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";
import { currentDate, tomorrowDate } from "@shared/utils/DayJs";
import { CreateCustomerUseCase } from "../CreateCustomer/CreateCustomerUseCase";
import { ChangeCustomerNameUseCase } from "./ChangeCustomerNameUseCase";

let createCityUseCase: CreateCityUseCase;
let createCustomerUseCase: CreateCustomerUseCase;
let changeCustomerNameUseCase: ChangeCustomerNameUseCase;
let inMemoryCitiesRepository: InMemoryCitiesRepository;
let inMemoryCustomersRepository: InMemoryCustomersRepository;
let dateProvider: IDateProvider;

describe("Change a customer's name", () => {
    beforeEach(() => {
        dateProvider = new DayjsDateProvider();
        inMemoryCitiesRepository = new InMemoryCitiesRepository();
        inMemoryCustomersRepository = new InMemoryCustomersRepository();

        createCityUseCase = new CreateCityUseCase(inMemoryCitiesRepository);
        createCustomerUseCase = new CreateCustomerUseCase(inMemoryCustomersRepository, inMemoryCitiesRepository, dateProvider);
        changeCustomerNameUseCase = new ChangeCustomerNameUseCase(inMemoryCustomersRepository);
    });

    it("should be able to change the customer name after create", async () => {
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

        const customerNewName = await changeCustomerNameUseCase.execute({
            id: customer.id,
            name: "Danny Munoz"
        });

        expect(customerNewName).toHaveProperty("id");
    });

    it("should not be able to change the customers name if the id is invalid", async () => {
        await expect(
            changeCustomerNameUseCase.execute({
                id: "123",
                name: "Danny Munoz"
            }),
        ).rejects.toEqual(
            new AppError("Invalid id"),
        );
    });

    it("should not be able to change the customers name if the id not exists", async () => {
        await expect(
            changeCustomerNameUseCase.execute({
                id: "49c69c66-e4e7-4e8f-8664-92e5c6bdd18d",
                name: "Maria McDonald"
            }),
        ).rejects.toEqual(
            new AppError("Customer not exists"),
        );
    });

    it("should not be able to change the customers name if the name is the same", async () => {
        const city = await createCityUseCase.execute({
            name: "Winifred Briggs",
            state: "CE"
        });

        const name = "Chris Cohen";

        const customer = await createCustomerUseCase.execute({
            name,
            gender: "male",
            birth_date: currentDate(),
            city: city.id
        });

        await expect(
            changeCustomerNameUseCase.execute({
                id: customer.id,
                name,
            })
        ).rejects.toEqual(
            new AppError("Name is already the same"),
        );
    });

    it("should not be able to change the customers name if the name is already in use for another customer", async () => {
        const city = await createCityUseCase.execute({
            name: "Teresa Walker",
            state: "CE"
        });

        const name1 = "Julian Hardy";
        const name2 = "Callie Horton";

        const customer = await createCustomerUseCase.execute({
            name: name1,
            gender: "male",
            birth_date: currentDate(),
            city: city.id
        });

        await createCustomerUseCase.execute({
            name: name2,
            gender: "male",
            birth_date: currentDate(),
            city: city.id
        });

        await expect(
            changeCustomerNameUseCase.execute({
                id: customer.id,
                name: name2,
            })
        ).rejects.toEqual(
            new AppError("Name is not available"),
        );
    });
});