// src/data-source.ts
import {DataSource} from "typeorm";
import {Category} from "./entities/Category";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: false,
    logging: false,
    entities: [Category],
    migrations: ["./migrations/*.ts"],
    subscribers: [],
});
