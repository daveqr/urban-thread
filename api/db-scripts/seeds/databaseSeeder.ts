// src/seeds/seed.ts
import {AppDataSource} from "../../src/data-source";
import {CategoryEntity} from "../../src/entities/category.entity";
import {ProductEntity} from "../../src/entities/product.entity";

const seedDatabase = async () => {
    await AppDataSource.initialize();

    const productRepo = AppDataSource.getRepository(ProductEntity);
    const categoryRepo = AppDataSource.getRepository(CategoryEntity);

    await productRepo.clear();
    await categoryRepo.clear();

    const category1 = categoryRepo.create({name: "Category 1", description: "Description for Category 1"});
    const category2 = categoryRepo.create({name: "Category 2", description: "Description for Category 2"});

    await categoryRepo.save([category1, category2]);

    const product1 = productRepo.create({name: "Product 1", description: "Description for Product 1", categories: [category1, category2]});
    const product2 = productRepo.create({name: "Product 2", description: "Description for Product 2", categories: [category1]});

    await productRepo.save([product1, product2]);

    console.log("Database seeded successfully");

    await AppDataSource.destroy();
};

seedDatabase().catch((error) => {
    console.error("Error seeding database:", error);
});
