import {Repository} from "typeorm";
import HighlightedCategoryEntity from "../../../src/infrastructure/data/sqllite/entities/highlighted-category.entity";
import {CategoryEntity} from "../../../src/infrastructure/data/sqllite/entities/category.entity";

export async function seedHighlightedCategories(highlightedCategoryRepo: Repository<HighlightedCategoryEntity>, categories: CategoryEntity[]) {
    const highlightedNames = [
        "Festival",
        "Silk Dresses",
        "Suits",
        "Showroom"
    ];

    const highlightedCategories = categories.filter(category => highlightedNames.includes(category.name));

    let position = 0;
    const highlightedEntities = highlightedCategories.map(category => {
        return highlightedCategoryRepo.create({
            category: category,
            position: position++
        });
    });

    await highlightedCategoryRepo.save(highlightedEntities);
}
