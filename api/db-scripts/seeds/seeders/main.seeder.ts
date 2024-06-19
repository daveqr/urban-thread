import {AppDataSource} from "../../../src/data-source";
import {CategoryEntity} from "../../../src/infrastructure/data/typeorm/entities/category.entity";
import {ProductEntity} from "../../../src/infrastructure/data/typeorm/entities/product.entity";
import HighlightedCategoryEntity from "../../../src/infrastructure/data/typeorm/entities/highlighted-category.entity";
import {seedProducts} from "./product.seeder";
import {seedCategories} from "./category.seeder";
import {seedHighlightedCategories} from "./highlighted-category.seeder";
import UserEntity from "../../../src/infrastructure/data/typeorm/entities/user.entity";
import {seedUsers} from "./user.seeder";

const seedDatabase = async () => {
    try {
        await AppDataSource.initialize();

        const highlightedCategoryRepo = AppDataSource.getRepository(HighlightedCategoryEntity);
        const productRepo = AppDataSource.getRepository(ProductEntity);
        const categoryRepo = AppDataSource.getRepository(CategoryEntity);
        const userRepo = AppDataSource.getRepository(UserEntity);

        await highlightedCategoryRepo.clear();
        await productRepo.clear();
        await categoryRepo.clear();
        await userRepo.clear();

        const categoryEntities = await seedCategories(categoryRepo);
        await seedProducts(productRepo, categoryEntities);
        await seedHighlightedCategories(highlightedCategoryRepo, categoryEntities);
        await seedUsers(userRepo);
        // } catch (error) {
        //     console.error("Error seeding database:", error);
    } finally {
        await AppDataSource.destroy();
    }
};

seedDatabase()
    .then(() => console.log("Database seeded successfully"))
    .catch(e => console.error("Error seeding database:", e));
