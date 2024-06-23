import {AppDataSource} from "../../../src/data-source";
import {CategoryEntity} from "../../../src/infrastructure/data/typeorm/entities/category.entity";
import {ProductEntity} from "../../../src/infrastructure/data/typeorm/entities/product.entity";
import HighlightedCategoryEntity from "../../../src/infrastructure/data/typeorm/entities/highlighted-category.entity";
import {seedProducts} from "./product.seeder";
import {seedCategories} from "./category.seeder";
import {seedHighlightedCategories} from "./highlighted-category.seeder";
import {Repository} from "typeorm";

const seedDatabase = async () => {
    try {
        await AppDataSource.initialize();

        const highlightedCategoryRepo =
            AppDataSource.getRepository(HighlightedCategoryEntity as any) as Repository<HighlightedCategoryEntity>;
        const productRepo = AppDataSource.getRepository(ProductEntity);
        const categoryRepo = AppDataSource.getRepository(CategoryEntity);

        await highlightedCategoryRepo.clear();
        await productRepo.clear();
        await categoryRepo.clear();

        const categoryEntities = await seedCategories(categoryRepo);
        await seedProducts(productRepo, categoryEntities);
        await seedHighlightedCategories(highlightedCategoryRepo, categoryEntities);
        // } catch (error) {
        //     console.error("Error seeding database:", error);
    } finally {
        await AppDataSource.destroy();
    }
};

seedDatabase()
    .then(() => console.log("Database seeded successfully"))
    .catch(e => console.error("Error seeding database:", e));
