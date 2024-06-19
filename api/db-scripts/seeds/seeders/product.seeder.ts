import {Repository} from "typeorm";
import {v4 as uuidv4} from 'uuid';
import slugify from "slugify";
// @ts-ignore
import productsData from '../data/products.json';
import {ProductEntity} from "../../../src/infrastructure/data/typeorm/entities/product.entity";
import {CategoryEntity} from "../../../src/infrastructure/data/typeorm/entities/category.entity";

export async function seedProducts(productRepo: Repository<ProductEntity>, categoryEntities: CategoryEntity[]) {
    const categoryMap = createCategoryMap(categoryEntities);
    const products = [];
    for (const productData of productsData) {
        const productCategories = productData.categoryEntities.map((name: string) => categoryMap[name]);
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

function createCategoryMap(categoryEntities: CategoryEntity[]): { [key: string]: CategoryEntity } {
    const categoryEntityMap: { [key: string]: CategoryEntity } = {};
    for (const category of categoryEntities) {
        categoryEntityMap[category.name] = category;
    }

    return categoryEntityMap;
}
