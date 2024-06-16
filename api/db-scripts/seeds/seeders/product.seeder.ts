import {Repository} from "typeorm";
import {v4 as uuidv4} from 'uuid';
import slugify from "slugify";
// @ts-ignore
import productsData from '../data/products.json';
import {ProductEntity} from "../../../src/infrastructure/data/typeorm/entities/product.entity";
import {CategoryEntity} from "../../../src/infrastructure/data/typeorm/entities/category.entity";

export async function seedProducts(productRepo: Repository<ProductEntity>, categories: CategoryEntity[]) {
    const categoryMap = createCategoryMap(categories);
    const products = [];
    for (const productData of productsData) {
        const productCategories = productData.categories.map((name: string) => categoryMap[name]);
        const productEntity: ProductEntity = productRepo.create({
            ...productData,
            categories: productCategories
        }) as unknown as ProductEntity;

        productEntity.uuid = uuidv4();
        productEntity.slug = slugify(productEntity.name + ' p', {lower: true, remove: /[*+~.()'"!:@]/g});

        products.push(productEntity);
    }
    await productRepo.save(products);
}

function createCategoryMap(categories: CategoryEntity[]): { [key: string]: CategoryEntity } {
    const categoryMap: { [key: string]: CategoryEntity } = {};
    for (const category of categories) {
        categoryMap[category.name] = category;
    }
    return categoryMap;
}
