import {Repository} from "typeorm";
import {v4 as uuidv4} from 'uuid';
import slugify from "slugify";
import {CategoryEntity} from "../../../src/entities/category.entity";
// @ts-ignore
import categoriesData from '../data/categories.json';

export async function seedCategories(categoryRepo: Repository<CategoryEntity>): Promise<CategoryEntity[]> {
    const categories = [];
    for (const categoryData of categoriesData) {
        const category: CategoryEntity = categoryRepo.create(categoryData) as unknown as CategoryEntity;

        category.uuid = uuidv4();
        category.slug = slugify(category.name + ' c', {lower: true, remove: /[*+~.()'"!:@]/g});

        categories.push(category);
    }
    await categoryRepo.save(categories);
    return categories;
}
