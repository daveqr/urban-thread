import {In} from "typeorm";
import {Category} from "../../../../entities/Category";
import {CategoryRepository} from "../../../domain/repositories/CategoryRepository";
import NewCategoryModel from "../../../domain/models/newcategory.model";
import {AppDataSource} from "../../../../data-source";

class SQLiteCategoryRepository implements CategoryRepository {
    async findAll(): Promise<NewCategoryModel[]> {
        const categoryRepo = AppDataSource.getRepository(Category);
        const categories = await categoryRepo.find();
        return categories.map((category) => new NewCategoryModel(category));
    }

    async findByIdWithProductLinks(categoryId: string): Promise<NewCategoryModel | null> {
        // const categoryRepo = getRepository(Category);
        // const category = await categoryRepo.findOne(categoryId, { relations: ["products", "edition"] });
        // return category ? new CategoryModel(category) : null;
        return null;
    }

    async findWithMinProducts(): Promise<NewCategoryModel[]> {
        // const categoryRepo = getRepository(Category);
        // const categories = await categoryRepo.find({ relations: ["products", "edition"] });
        // return categories.map(category => new CategoryModel(category));
        return [];
    }

    async findWithMinProductsAndProductLinks(): Promise<NewCategoryModel[]> {
        return [];
        // const categories = await this.findWithMinProducts();
        // // Assuming ProductTransformer is adapted for SQLite
        // const productLinksByCategory = ProductTransformer.groupProductLinksByCategory(categories);
        // return categories.map(category => {
        //     category.productLinks = productLinksByCategory[category.id];
        //     return category;
        // });
    }

    async findByIds(categoryIds: string[]): Promise<NewCategoryModel[]> {
        const categoryRepo = AppDataSource.getRepository(Category);

        const categories = await categoryRepo.findBy({id: In([1, 2, 3])});
        return categories.map(category => new NewCategoryModel(category));
    }

    async findById(categoryId: any): Promise<NewCategoryModel | null> {
        // const categoryRepo = AppDataSource.getRepository(Category);
        // const category = await categoryRepo.findOne(categoryId, {relations: ["products", "edition"]});
        // return category ? new CategoryModel(category) : null;
        return null;
    }
}

export default SQLiteCategoryRepository;
