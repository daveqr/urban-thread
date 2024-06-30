import express, {Application} from 'express';
import userRoutes from './endpoints/users/user.routes';
import {USERS_BASE_URL} from './config/urls';
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
        this.app.use(USERS_BASE_URL, userRoutes);
    }
}

export default new App();
