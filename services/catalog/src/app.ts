import express, {Application} from 'express';
import categoryRoutes from './endpoints/category/categories.routes';
import productRoutes from './endpoints/product/products.routes';
import {CATEGORY_BASE_URL, PRODUCT_BASE_URL} from './config/urls';
import {container} from "tsyringe";
import {CentralLogger} from "shared/lib/logger.util";

const logger = container.resolve<CentralLogger>('CentralLogger');

class App {
    private app: Application;

    constructor() {
        this.app = express();
        this.initializeMiddleware();
        this.initializeRoutes();
    }

    public listen(port: string | number) {
        this.app.listen(port, () => {
            logger.info(`Server is running on port ${port}`);
        });
    }

    private initializeMiddleware() {
        this.app.use(express.json());
    }

    private initializeRoutes() {
        this.app.use(PRODUCT_BASE_URL, productRoutes);
        this.app.use(CATEGORY_BASE_URL, categoryRoutes);
    }
}

export default new App();
