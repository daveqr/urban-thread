import {AppDataSource} from "../../src/data-source";
import {CategoryEntity} from "../../src/entities/category.entity";
import {ProductEntity} from "../../src/entities/product.entity";
import {Repository} from "typeorm";

// @ts-ignore
import categoriesData from './data/categories.json';
import {v4 as uuidv4} from 'uuid';

// @ts-ignore
import productsData from './data/products.json';
import slugify from "slugify";
import HighlightedCategoryEntity from "../../src/entities/highlighted-category.entity";

const seedDatabase = async () => {
    async function insertProducts(categoryMap: {
        [key: string]: CategoryEntity
    }, productRepo: Repository<ProductEntity>) {
        const products = [];
        for (const productData of productsData) {
            const productCategories = productData.categories.map((name: string) => categoryMap[name]);
            const product: ProductEntity = productRepo.create({
                ...productData,
                categories: productCategories
            }) as unknown as ProductEntity;

            product.uuid = uuidv4();
            product.slug = slugifyValue(product.name + ' p');

            products.push(product);
        }
        await productRepo.save(products);
    }

    function slugifyValue(value: string) {
        return slugify(value, {lower: true, remove: /[*+~.()'"!:@]/g});
    }

    async function insertCategories(categoryRepo: Repository<CategoryEntity>) {
        const categories = [];
        for (const categoryData of categoriesData) {
            const category: CategoryEntity = categoryRepo.create(categoryData) as unknown as CategoryEntity;

            category.uuid = uuidv4();
            category.slug = slugifyValue(category.name + ' c');

            categories.push(category);
        }
        await categoryRepo.save(categories);
        return categories;
    }

    async function insertHighlightedCategories(highlightedCategoryRepo: Repository<HighlightedCategoryEntity>, categories: CategoryEntity[]) {
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


    function createCategoryMap(categories: any[]) {
        const categoryMap: { [key: string]: CategoryEntity } = {};
        for (const category of categories) {
            categoryMap[category.name] = category;
        }
        return categoryMap;
    }

    try {
        await AppDataSource.initialize();

        const highlightedCategoryRepo = AppDataSource.getRepository(HighlightedCategoryEntity);
        const productRepo = AppDataSource.getRepository(ProductEntity);
        const categoryRepo = AppDataSource.getRepository(CategoryEntity);

        await highlightedCategoryRepo.clear();
        await productRepo.clear();
        await categoryRepo.clear();

        const categories = await insertCategories(categoryRepo);
        await insertProducts(createCategoryMap(categories), productRepo);
        await insertHighlightedCategories(highlightedCategoryRepo, categories);

        console.log("Database seeded successfully");
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        await AppDataSource.destroy();
    }
};

seedDatabase();
