import NewCategoryModel from "../models/newcategory.model";

export interface CategoryRepository {
    findAll(): Promise<NewCategoryModel[]>;

    findById(categoryId: string): Promise<NewCategoryModel | null>;

    findWithMinProductsAndProductLinks(): Promise<NewCategoryModel[]>;

    findByIdWithProductLinks(categoryId: string): Promise<NewCategoryModel | null>;

    findWithMinProducts(): Promise<NewCategoryModel[] | null>;

    findByIds(categoryIds: string[]): Promise<NewCategoryModel[]>;
}
