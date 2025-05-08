// import "@shared/container/providers";

import { UsersRepository } from "@modules/user/repository/users.repository";
import { IUsersRepository } from "@modules/user/repository/users.repository.interface";
import { container } from "tsyringe";

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
);
