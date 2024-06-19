import {DataSource, In, Repository} from "typeorm";
import {CategoryEntity} from "./entities/category.entity";
import {CategoryRepository} from "../../../core/repositories/category.repository";
import Category from "../../../core/models/category.model";
import {AppDataSource} from "../../../data-source";
import {HighlightedCategoryx} from "../../../core/models/blah";
import {Product} from "../../../core/models/product.model";


class TypeORMCategoryRepository implements CategoryRepository {
    private dataSource: DataSource;
    private categoryEntityRepository: Repository<CategoryEntity>;

    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
        this.categoryEntityRepository = this.categoryEntityRepository = this.dataSource.getRepository(CategoryEntity);
    }

    async find(): Promise<Category[]> {
        const categories = await this.categoryEntityRepository.find({relations: ["products"]});

        return this.mapToDomainCategories(categories);
    }

    async findByUuid(uuid: string): Promise<Category | null> {
        const categoryEntity = await this.categoryEntityRepository.findOne({
            where: {uuid},
            relations: ["products"]
        });

        if (!categoryEntity) {
            return null;
        }

        let categories = this.mapToDomainCategories([categoryEntity]);
        return categories[0];
    }

    async findHighlightedCategories(): Promise<HighlightedCategoryx[]> {
        const categoryRepo = this.dataSource.getRepository(CategoryEntity);

        const highlightedCategoryEntities = await categoryRepo.createQueryBuilder('category')
            .innerJoinAndSelect('highlighted_categories', 'highlighted', 'category.id = highlighted.categoryId')
            .leftJoinAndSelect('category.products', 'product')
            .addSelect('highlighted.position', 'position')
            .getRawAndEntities();

        const result = highlightedCategoryEntities.raw.map((rawResult, index) => ({
            categoryEntity: highlightedCategoryEntities.entities[index],
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
            const products: Product[] = categoryEntity.products.map(productEntity => ({
                uuid: productEntity.uuid,
                name: productEntity.name,
                description: productEntity.description,
                slug: productEntity.slug
            }));

            const category = new Category(categoryEntity.uuid, categoryEntity.name, categoryEntity.description, products);
            category.slug = categoryEntity.slug;

            return category;
        });
    }

    private mapToDomainHighlightedCategories(categories: {
        position: any;
        categoryEntity: CategoryEntity
    }[]): HighlightedCategoryx[] {
        return categories.map(({categoryEntity, position}) => {
            const products: Product[] = categoryEntity.products.map(productEntity => ({
                uuid: productEntity.uuid,
                name: productEntity.name,
                description: productEntity.description,
                slug: productEntity.slug
            }));

            const highlightedCategory: HighlightedCategoryx = {
                ...categoryEntity,
                products: products,
                position: position,
            };

            return highlightedCategory;
        });
    }
}

export default TypeORMCategoryRepository;
