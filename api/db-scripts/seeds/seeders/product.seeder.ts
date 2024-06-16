import {Repository} from "typeorm";
import {v4 as uuidv4} from 'uuid';
import slugify from "slugify";
// @ts-ignore
import productsData from '../data/products.json';
import {ProductEntity} from "../../../src/entities/product.entity";
import {CategoryEntity} from "../../../src/entities/category.entity";

export async function seedProducts(productRepo: Repository<ProductEntity>, categories: CategoryEntity[]) {
    const categoryMap = createCategoryMap(categories);
    const products = [];
    for (const productData of productsData) {
        const productCategories = productData.categories.map((name: string) => categoryMap[name]);
        const product: ProductEntity = productRepo.create({
            ...productData,
            categories: productCategories
        }) as unknown as ProductEntity;

        product.uuid = uuidv4();
        product.slug = slugify(product.name + ' p', {lower: true, remove: /[*+~.()'"!:@]/g});

        products.push(product);
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
