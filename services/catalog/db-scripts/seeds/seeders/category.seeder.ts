import { Repository } from "typeorm";
import { CategoryEntity } from "../../../src/infrastructure/data/typeorm/entities/category.entity";
// @ts-ignore
import categoriesData from "../data/categories.json";
import { UuidIdGenerator } from "../../../src/utils/id-generator.util";
import slugify from "slugify";

export async function seedCategories(
  categoryRepo: Repository<CategoryEntity>,
): Promise<CategoryEntity[]> {
  const categoryEntities = [];
  for (const categoryData of categoriesData) {
    const categoryEntity: CategoryEntity = categoryRepo.create(
      categoryData,
    ) as unknown as CategoryEntity;

    categoryEntity.uuid = new UuidIdGenerator().generateId();
    categoryEntity.slug = slugify(categoryEntity.name + " c", {
      lower: true,
      remove: /[*+~.()'"!:@]/g,
    });

    categoryEntities.push(categoryEntity);
  }
  await categoryRepo.save(categoryEntities);
  return categoryEntities;
}
