import "reflect-metadata";
import "./di";
import express from 'express';
import productRoutes from "./endpoints/product/products.routes";
import {AppDataSource} from "./data-source";
import logger from './utils/logger.util';

const app = express();
app.use(express.json());
app.use('/catalog', productRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});

async function main() {
    await AppDataSource.initialize()
        .then(() => {
            logger.info("Data Source has been initialized!")
        })
        .then(() => {
            logger.info("UrbanThread Catalog Service is ready.")
        })
        .catch((err) => {
            logger.info("Error during Data Source initialization", err)
        })
}

main().catch(console.error)