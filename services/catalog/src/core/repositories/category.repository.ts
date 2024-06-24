import Category from "../models/category.model";
import {HighlightedCategory} from "../models/highlighted-category.model";

export interface CategoryRepository {
    find(): Promise<Category[]>;

    findById(categoryId: string): Promise<Category | null>;

    findByUuid(uuid: string): Promise<Category | null>;

    findWithMinProductsAndProductLinks(): Promise<Category[]>;

    findByIdWithProductLinks(categoryId: string): Promise<Category | null>;

    findWithMinProducts(): Promise<Category[] | null>;

    findByIds(categoryIds: string[]): Promise<Category[]>;

    findHighlightedCategories(): Promise<HighlightedCategory[]>;
}
