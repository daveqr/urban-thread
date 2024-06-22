import {DataSource, In, Repository} from "typeorm";
import {CategoryEntity} from "./entities/category.entity";
import {CategoryRepository} from "../../../core/repositories/category.repository";
import Category from "../../../core/models/category.model";
import {AppDataSource} from "../../../data-source";
import {HighlightedCategory} from "../../../core/models/highlighted-category.model";
import {mapToDomainCategories, mapToDomainHighlightedCategories} from "./mapper";
import {inject, injectable} from "tsyringe";


@injectable()
class TypeORMCategoryRepository implements CategoryRepository {
    private categoryEntityRepository: Repository<CategoryEntity>;

    constructor(
        @inject('DataSource') private dataSource: DataSource
    ) {
        this.categoryEntityRepository = this.categoryEntityRepository = this.dataSource.getRepository(CategoryEntity);
    }

    async find(): Promise<Category[]> {
        const categories = await this.categoryEntityRepository.find({relations: ["products"]});

        return mapToDomainCategories(categories);
    }

    async findByUuid(uuid: string): Promise<Category | null> {
        const categoryEntity = await this.categoryEntityRepository.findOne({
            where: {uuid},
            relations: ["products"]
        });

        if (!categoryEntity) {
            return null;
        }

        let categories = mapToDomainCategories([categoryEntity]);
        return categories[0];
    }

    async findHighlightedCategories(): Promise<HighlightedCategory[]> {
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

        return mapToDomainHighlightedCategories(result);
    }

    async findByIdWithProductLinks(categoryId: string): Promise<Category | null> {
        // const categoryRepo = getRepository(Category);
        // const category = await categoryRepo.findOne(categoryId, { relations: ["productEntities", "edition"] });
        // return category ? new CategoryModel(category) : null;
        return null;
    }

    async findWithMinProducts(): Promise<Category[]> {
        // const categoryRepo = getRepository(Category);
        // const categories = await categoryRepo.find({ relations: ["productEntities", "edition"] });
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

        const categoryEntities = await categoryRepo.findBy({id: In([1, 2, 3])});
        return mapToDomainCategories(categoryEntities);
    };

    async findById(categoryId: any): Promise<Category | null> {
        // const categoryRepo = AppDataSource.getRepository(Category);
        // const category = await categoryRepo.findOne(categoryId, {relations: ["products", "edition"]});
        // return category ? new CategoryModel(category) : null;
        return null;
    }
}

export default TypeORMCategoryRepository;
