import {Repository} from "typeorm";
import {v4 as uuidv4} from 'uuid';
import slugify from "slugify";
import {CategoryEntity} from "../../../src/infrastructure/data/typeorm/entities/category.entity";
// @ts-ignore
import categoriesData from '../data/categories.json';

export async function seedCategories(categoryRepo: Repository<CategoryEntity>): Promise<CategoryEntity[]> {
    const categories = [];
    for (const categoryData of categoriesData) {
        const categoryEntity: CategoryEntity = categoryRepo.create(categoryData) as unknown as CategoryEntity;

        categoryEntity.uuid = uuidv4();
        categoryEntity.slug = slugify(categoryEntity.name + ' c', {lower: true, remove: /[*+~.()'"!:@]/g});

        categories.push(categoryEntity);
    }
    await categoryRepo.save(categories);
    return categories;
}
