import CategoryModel from "../models/category.model";

export interface CategoryRepository {
    findAll(): Promise<CategoryModel[]>;

    findById(categoryId: string): Promise<CategoryModel | null>;

    findWithMinProductsAndProductLinks(): Promise<CategoryModel[]>;

    findByIdWithProductLinks(categoryId: string): Promise<CategoryModel | null>;

    findWithMinProducts(): Promise<CategoryModel[] | null>;

    findByIds(categoryIds: string[]): Promise<CategoryModel[]>;
}
