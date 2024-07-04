import { DataSource } from "typeorm";
import path from "path";

const entitiesPath = path.join(
  __dirname,
  "infrastructure/data/typeorm/entities",
  "*.ts",
);

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: false,
  entities: [entitiesPath],
  migrations: ["./migrations/*.ts"],
  subscribers: [],
});
