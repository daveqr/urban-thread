import {container} from "tsyringe";
import {IdGenerator, UuidIdGenerator} from "./utils/id-generator.util";
import {DataSource} from "typeorm";
import {TransformationService} from "./endpoints/transformation.service";
import Category from "./core/models/category.model";
import {AppDataSource} from "./data-source";
import {HighlightedCategory} from "./core/models/highlighted-category.model";
import {
    CategoryTransformationService,
    HighlightedCategoryTransformationService
} from "./endpoints/category/category.transformation.service";
import {CategoryRepository} from "./core/repositories/category.repository";
import TypeORMCategoryRepository from "./infrastructure/data/typeorm/category.repository.typeorm";
import {CategoryService, CategoryServiceImpl} from "./core/services/category.service";
import CategoryController from "./endpoints/category/category.controller";
import {ProductRepository} from "./core/repositories/product.repository";
import TypeORMProductRepository from "./infrastructure/data/typeorm/product.repository.typeorm";
import {ProductService, ProductServiceImpl} from "./core/services/product.service";
import ProductController from "./endpoints/product/product.controller";
import CategoryUseCaseImpl, {CategoryUseCase} from "./application/usecases/categoryUseCaseImpl";
import ProductUseCaseImpl, {ProductUseCase} from "./application/usecases/product.usecase";

container.register<IdGenerator>('IdGenerator', UuidIdGenerator);

container.register<DataSource>('DataSource', {useValue: AppDataSource});
container.register<TransformationService<Category, any>>('CategoryTransformationService', CategoryTransformationService);
container.register<TransformationService<HighlightedCategory, any>>('HighlightedCategoryTransformationService', HighlightedCategoryTransformationService);

container.register<CategoryRepository>('CategoryRepository', TypeORMCategoryRepository);
container.register<CategoryService>('CategoryService', CategoryServiceImpl);
container.register<CategoryUseCase>('CategoryUseCase', CategoryUseCaseImpl);
container.register<CategoryController>('CategoryController', CategoryController);

container.register<ProductRepository>('ProductRepository', TypeORMProductRepository);
container.register<ProductService>('ProductService', ProductServiceImpl);
container.register<ProductUseCase>('ProductUseCase', ProductUseCaseImpl);
container.register<ProductController>('ProductController', ProductController);
