import {CategoryRepository} from "../../../src/core/repositories/category.repository";
import Category from "../../../src/core/models/category.model";
import {HighlightedCategory} from "../../../src/core/models/highlighted-category.model";

export class CategoryRepositoryTestDouble implements CategoryRepository {
    find(): Promise<Category[]> {
        return Promise.resolve([]);
    }

    findById(categoryId: string): Promise<Category | null> {
        return Promise.resolve(null);
    }

    findByIdWithProductLinks(categoryId: string): Promise<Category | null> {
        return Promise.resolve(null);
    }

    findByIds(categoryIds: string[]): Promise<Category[]> {
        return Promise.resolve([]);
    }

    findByUuid(uuid: string): Promise<Category | null> {
        return Promise.resolve(null);
    }

    findHighlightedCategories(): Promise<HighlightedCategory[]> {
        return Promise.resolve([]);
    }

    findWithMinProducts(): Promise<Category[] | null> {
        return Promise.resolve(null);
    }

    findWithMinProductsAndProductLinks(): Promise<Category[]> {
        return Promise.resolve([]);
    }
}