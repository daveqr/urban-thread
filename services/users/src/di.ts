import {container} from "tsyringe";
import {IdGenerator, UuidIdGenerator} from "./utils/id-generator.util";
import {DataSource} from "typeorm";
import {TransformationService} from "./endpoints/transformation.service";
import {AppDataSource} from "./data-source";

import UserController from "./endpoints/users/user.controller";
import {UserRepository} from "./core/repositories/user.repository";
import TypeORMUserRepository from "./infrastructure/data/typeorm/user.repository.typeorm";
import {UserService, UserServiceImpl} from "./core/services/user.service";
import UserUseCaseImpl, {UserUseCase} from "./application/usecases/user.usecase";
import User from "./core/models/user.model";
import {UserTransformationService} from "./endpoints/users/user.transformation.service";
import {CentralLogger} from "shared/lib/logger.util";

container.register<CentralLogger>('CentralLogger', {
    useFactory: () => new CentralLogger('UserService', '/Users/dave/projects/urban-thread/ut.log')
});
container.register<IdGenerator>('IdGenerator', UuidIdGenerator);

container.register<DataSource>('DataSource', {useValue: AppDataSource});
container.register<TransformationService<User, any>>('UserResponseTransformer', UserTransformationService);

container.register<UserRepository>('UserRepository', TypeORMUserRepository);
container.register<UserService>('UserService', UserServiceImpl);
container.register<UserUseCase>('UserUseCase', UserUseCaseImpl);
container.register<UserController>('UserController', UserController);


