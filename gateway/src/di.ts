import {container} from "tsyringe";
import {AppDataSource} from "./data-source";
import {DataSource} from "typeorm";
import CategoryUseCaseImpl, {CategoryUseCase} from "./application/usecases/category.usecase";
import CategoryController from "./endpoints/category/category.controller";
import {
    CategoryTransformationService,
    HighlightedCategoryTransformationService
} from "./endpoints/category/category.transformation.service";
import {TransformationService} from "./endpoints/transformation.service";
import Category from "./core/models/category.model";
import {HighlightedCategory} from "./core/models/highlighted-category.model";
import ProductController from "./endpoints/product/product.controller";
import ProductUseCaseImpl, {ProductUseCase} from "./application/usecases/product.usecase";
import {ProductService} from "./core/services/product.service";
import {CategoryService} from "./core/services/category.service";
import TypeORMUserRepository from "./infrastructure/data/typeorm/user.repository.typeorm";
import {UserRepository} from "./core/repositories/user.repository";
import {UserService} from "./core/services/user.service";
import UserUseCaseImpl, {UserUseCase} from "./application/usecases/user.usecase";
import UserController from "./endpoints/user/user.controller";
import {ProductRestService} from "./infrastructure/services/product.service.rest";
import {CategoryRestService} from "./infrastructure/services/category.service.rest";
import {UserRestService} from "./infrastructure/services/user.service";
import {IdGenerator, UuidIdGenerator} from "shared/lib/id-generator.util";


container.register<IdGenerator>('IdGenerator', UuidIdGenerator);

container.register<DataSource>('DataSource', {useValue: AppDataSource});
container.register<TransformationService<Category, any>>('CategoryTransformationService', CategoryTransformationService);
container.register<TransformationService<HighlightedCategory, any>>('HighlightedCategoryTransformationService', HighlightedCategoryTransformationService);

container.register<CategoryService>('CategoryService', CategoryRestService);
container.register<CategoryUseCase>('CategoryUseCase', CategoryUseCaseImpl);
container.register<CategoryController>('CategoryController', CategoryController);

container.register<ProductService>('ProductService', ProductRestService);
container.register<ProductUseCase>('ProductUseCase', ProductUseCaseImpl);
container.register<ProductController>('ProductController', ProductController);

container.register<UserRepository>('UserRepository', TypeORMUserRepository);
container.register<UserService>('UserService', UserRestService);
container.register<UserUseCase>('UserUseCase', UserUseCaseImpl);
container.register<UserController>('UserController', UserController);