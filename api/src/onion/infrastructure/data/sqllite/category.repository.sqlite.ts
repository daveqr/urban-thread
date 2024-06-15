import {In} from "typeorm";
import {CategoryEntity} from "../../../../entities/category.entity";
import {CategoryRepository} from "../../../domain/repositories/category.repository";
import Category from "../../../domain/models/category.model";
import {AppDataSource} from "../../../../data-source";
import Product from "../../../domain/models/product.model";
import HighlightedCategory from "../../../domain/models/highlighted-category.model";

interface HighlightedCategoryResult {
    category: CategoryEntity;
    position: number;
}

class SQLiteCategoryRepository implements CategoryRepository {
    async find(): Promise<Category[]> {
        const categoryRepo = AppDataSource.getRepository(CategoryEntity);

        const categories = await categoryRepo.find({relations: ["products"]});

        return this.mapToDomainCategories(categories);
    }

    async findHighlightedCategories(): Promise<HighlightedCategory[]> {
        const categoryRepo = AppDataSource.getRepository(CategoryEntity);

        const highlightedCategories = await categoryRepo.createQueryBuilder('category')
            .innerJoinAndSelect('highlighted_categories', 'highlighted', 'category.id = highlighted.categoryId')
            .leftJoinAndSelect('category.products', 'product')
            .addSelect('highlighted.position', 'position')
            .getRawAndEntities();

        const result = highlightedCategories.raw.map((rawResult, index) => ({
            category: highlightedCategories.entities[index],
            position: rawResult.position
        }));

        return this.mapToDomainHighlightedCategories(result);
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
        return categories.map(category => new Category(category.uuid, category.name, category.description));
    }

    async findById(categoryId: any): Promise<Category | null> {
        // const categoryRepo = AppDataSource.getRepository(Category);
        // const category = await categoryRepo.findOne(categoryId, {relations: ["products", "edition"]});
        // return category ? new CategoryModel(category) : null;
        return null;
    }

    private mapToDomainCategories(categories: CategoryEntity[]) {
        return categories.map((categoryEntity) => {
            let products = categoryEntity.products.map(productEntity =>
                new Product(productEntity.id, productEntity.name, productEntity.description, [], productEntity.slug)
            );

            let category = new Category(categoryEntity.uuid, categoryEntity.name, categoryEntity.description, products);
            category.slug = categoryEntity.slug;

            return category;
        });
    }

    private mapToDomainHighlightedCategories(categoriesWithPosition: HighlightedCategoryResult[]): HighlightedCategory[] {
        return categoriesWithPosition.map(({category, position}) => {
            let products = category.products.map(productEntity =>
                new Product(productEntity.id, productEntity.name, productEntity.description, [], productEntity.slug)
            );

            let highlightedCategory = new HighlightedCategory(category.uuid, category.name, products, position, category.description);
            highlightedCategory.slug = category.slug;

            return highlightedCategory;
        });
    }
}

export default SQLiteCategoryRepository;
