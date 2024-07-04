import "reflect-metadata";
import "./di";
import app from "./app";
import { AppDataSource } from "./data-source";
import { container } from "tsyringe";
import { CentralLogger } from "shared/lib/logger.util";

const logger = container.resolve<CentralLogger>("CentralLogger");
const PORT = process.env.PORT || 4000;

app.listen(PORT);

async function main() {
  await AppDataSource.initialize()
    .then(() => {
      logger.info("Data Source has been initialized!");
    })
    .then(() => {
      logger.info("UrbanThread Catalog Service is ready.");
    })
    .catch((err) => {
      logger.info("Error during Data Source initialization", err);
    });
}

main().catch(console.error);
