import { Repository } from "typeorm";
import { CategoryEntity } from "../../../src/infrastructure/data/typeorm/entities/category.entity";
import { UuidIdGenerator } from "../../../src/utils/id-generator.util";
import slugify from "slugify";
import categorySeeds from "../data/categories";

export async function seedCategories(
  categoryRepo: Repository<CategoryEntity>,
): Promise<CategoryEntity[]> {
  const categoryEntities = [];
  for (const categorySeed of categorySeeds) {
    const categoryEntity: CategoryEntity = categoryRepo.create(
      categorySeed,
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
