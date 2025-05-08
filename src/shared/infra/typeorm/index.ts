import { DataSource } from "typeorm";
import path from "path";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 54321, // Using the port from your ormconfig.json
  username: "root", // Using the username from your ormconfig.json
  password: "toor", // Using the password from your ormconfig.json
  database: process.env.NODE_ENV === "test" ? "leadmove_test" : "leadmove",
  entities: [path.join(__dirname, "../../../modules/**/entities/*.ts")],
  migrations: [path.join(__dirname, "./migrations/*.ts")],
  synchronize: false,
});

export default async (): Promise<DataSource> => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource;
};

export async function createConnection(): Promise<DataSource> {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource;
}