import {In} from "typeorm";
import {CategoryEntity} from "../../../../entities/category.entity";
import {CategoryRepository} from "../../../domain/repositories/category.repository";
import Category from "../../../domain/models/category.model";
import {AppDataSource} from "../../../../data-source";
import Product from "../../../domain/models/product.model";

class SQLiteCategoryRepository implements CategoryRepository {
    async find(): Promise<Category[]> {
        const categoryRepo = AppDataSource.getRepository(CategoryEntity);
        const categories = await categoryRepo.find({relations: ["products"]});

        return categories.map((categoryEntity) => {
            const products = categoryEntity.products.map(productEntity =>
                new Product(productEntity.id, productEntity.name, productEntity.description, [], productEntity.slug)
            );

            let category = new Category(categoryEntity.id, categoryEntity.name, categoryEntity.description, products);
            category.slug = categoryEntity.slug;
            return category;
        });
    }

    async findByIdWithProductLinks(categoryId: string): Promise<Category | null> {
        // const categoryRepo = getRepository(Category);
        // const category = await categoryRepo.findOne(categoryId, { relations: ["products", "edition"] });
        // return category ? new CategoryModel(category) : null;
        return null;
    }

    async findWithMinProducts(): Promise<Category[]> {
        // const categoryRepo = getRepository(Category);
        // const categories = await categoryRepo.find({ relations: ["products", "edition"] });
        // return categories.map(category => new CategoryModel(category));
        return [];
    }

    async findWithMinProductsAndProductLinks(): Promise<Category[]> {
        return [];
        // const categories = await this.findWithMinProducts();
        // // Assuming ProductTransformer is adapted for SQLite
        // const productLinksByCategory = ProductTransformer.groupProductLinksByCategory(categories);
        // return categories.map(category => {
        //     category.productLinks = productLinksByCategory[category.id];
        //     return category;
        // });
    }

    async findByIds(categoryIds: string[]): Promise<Category[]> {
        const categoryRepo = AppDataSource.getRepository(CategoryEntity);

        const categories = await categoryRepo.findBy({id: In([1, 2, 3])});
        return categories.map(category => new Category(category.id, category.name, category.description));
    }

    async findById(categoryId: any): Promise<Category | null> {
        // const categoryRepo = AppDataSource.getRepository(Category);
        // const category = await categoryRepo.findOne(categoryId, {relations: ["products", "edition"]});
        // return category ? new CategoryModel(category) : null;
        return null;
    }
}

export default SQLiteCategoryRepository;
