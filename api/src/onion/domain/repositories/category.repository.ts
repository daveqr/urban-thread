import Category from "../models/category.model";

export interface CategoryRepository {
    find(): Promise<Category[]>;

    findById(categoryId: string): Promise<Category | null>;

    findWithMinProductsAndProductLinks(): Promise<Category[]>;

    findByIdWithProductLinks(categoryId: string): Promise<Category | null>;

    findWithMinProducts(): Promise<Category[] | null>;

    findByIds(categoryIds: string[]): Promise<Category[]>;
}