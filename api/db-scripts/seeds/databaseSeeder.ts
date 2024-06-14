// src/seeds/seed.ts
import {AppDataSource} from "../../src/data-source";
import {categorySeed, productSeed} from "./category.seed";
import {CategoryEntity} from "../../src/entities/category.entity";
import {ProductEntity} from "../../src/entities/product.entity";

const seedDatabase = async () => {
    await AppDataSource.initialize();

    const categoryRepo = AppDataSource.getRepository(CategoryEntity);
    const productRepo = AppDataSource.getRepository(ProductEntity);

    await categoryRepo.clear();
    await categoryRepo.save(categorySeed);

    await productRepo.clear();
    await productRepo.save(productSeed);

    console.log("Database seeded successfully");

    await AppDataSource.destroy();
};

seedDatabase().catch((error) => {
    console.error("Error seeding database:", error);
});
