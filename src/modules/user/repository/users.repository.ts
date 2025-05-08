import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { IUsersRepository } from "./users.repository.interface";
import { AppDataSource } from "../../../shared/infra/typeorm/index"; // Adjust this import path as needed

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async findById(id: string): Promise<User | null> {
    return await this.repository.findOne({ where: { id: Number(id) } }) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.repository.findOne({ where: { email } }) || null;
  }
}

export { UsersRepository };