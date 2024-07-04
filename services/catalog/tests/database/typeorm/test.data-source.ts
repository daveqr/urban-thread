import path from "path";
import { DataSource } from "typeorm";

const entitiesPath = path.join(
  __dirname,
  "../../../src/infrastructure/data/typeorm/entities",
  "*.ts",
);
const testDataSource = new DataSource({
  type: "sqlite",
  database: ":memory:",
  synchronize: true,
  logging: false,
  entities: [entitiesPath],
});

export { testDataSource };
