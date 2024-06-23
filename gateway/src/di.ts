import {container} from "tsyringe";
import {CategoryRepository} from "./core/repositories/category.repository";
import TypeORMCategoryRepository from "./infrastructure/data/typeorm/category.repository.typeorm";
import {AppDataSource} from "./data-source";
import {DataSource} from "typeorm";
import CategoryUseCaseImpl, {CategoryUseCase} from "./application/usecases/categoryUseCaseImpl";
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
import TypeORMProductRepository from "./infrastructure/data/typeorm/product.repository.typeorm";
import {ProductRepository} from "./core/repositories/product.repository";
import {ProductService} from "./core/services/product.service";
import {CategoryService, CategoryServiceImpl} from "./core/services/category.service";
import TypeORMUserRepository from "./infrastructure/data/typeorm/user.repository.typeorm";
import {UserRepository} from "./core/repositories/user.repository";
import {UserService, UserServiceImpl} from "./core/services/user.service";
import UserUseCaseImpl, {UserUseCase} from "./application/usecases/user.usecase";
import UserController from "./endpoints/user/user.controller";
import {IdGenerator, UuidIdGenerator} from "./utils/id-generator.util";
import {ProductRestService} from "./infrastructure/services/product.service.rest";


container.register<IdGenerator>('IdGenerator', UuidIdGenerator);

container.register<DataSource>('DataSource', {useValue: AppDataSource});
container.register<TransformationService<Category, any>>('CategoryTransformationService', CategoryTransformationService);
container.register<TransformationService<HighlightedCategory, any>>('HighlightedCategoryTransformationService', HighlightedCategoryTransformationService);

container.register<CategoryRepository>('CategoryRepository', TypeORMCategoryRepository);
container.register<CategoryService>('CategoryService', CategoryServiceImpl);
container.register<CategoryUseCase>('CategoryUseCase', CategoryUseCaseImpl);
container.register<CategoryController>('CategoryController', CategoryController);

container.register<ProductRepository>('ProductRepository', TypeORMProductRepository);
container.register<ProductService>('ProductService', ProductRestService);
container.register<ProductUseCase>('ProductUseCase', ProductUseCaseImpl);
container.register<ProductController>('ProductController', ProductController);

container.register<UserRepository>('UserRepository', TypeORMUserRepository);
container.register<UserService>('UserService', UserServiceImpl);
container.register<UserUseCase>('UserUseCase', UserUseCaseImpl);
container.register<UserController>('UserController', UserController);