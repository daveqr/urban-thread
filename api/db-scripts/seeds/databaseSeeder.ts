// src/seeds/seed.ts
import {AppDataSource} from "../../src/data-source";
import {categorySeed} from "./categorySeed";
import {Category} from "../../src/entities/Category";

const seedDatabase = async () => {
    await AppDataSource.initialize();

    const categoryRepo = AppDataSource.getRepository(Category);

    await categoryRepo.clear();
    await categoryRepo.save(categorySeed);

    console.log("Database seeded successfully");

    await AppDataSource.destroy();
};

seedDatabase().catch((error) => {
    console.error("Error seeding database:", error);
});
