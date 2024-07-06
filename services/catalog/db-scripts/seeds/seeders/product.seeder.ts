import { Repository } from "typeorm";
import slugify from "slugify";
import productSeeds from "../data/products";
import { ProductEntity } from "../../../src/infrastructure/data/typeorm/entities/product.entity";
import { CategoryEntity } from "../../../src/infrastructure/data/typeorm/entities/category.entity";
import { UuidIdGenerator } from "../../../src/utils/id-generator.util";

export async function seedProducts(
  productRepo: Repository<ProductEntity>,
  categoryEntities: CategoryEntity[],
) {
  const categoryEntityMap = createCategoryMap(categoryEntities);
  const productEntities: ProductEntity[] = [];

  for (const productSeed of productSeeds) {
    const productCategories = productSeed.categories.map(
      (name: string) => categoryEntityMap[name],
    );
    const productEntity: ProductEntity = productRepo.create({
      ...productSeed,
      categories: productCategories,
    }) as unknown as ProductEntity;

    productEntity.uuid = new UuidIdGenerator().generateId();
    productEntity.slug = slugify(productEntity.name + " p", {
      lower: true,
      remove: /[*+~.()'"!:@]/g,
    });

    productEntities.push(productEntity);
  }

  await productRepo.save(productEntities);
}

function createCategoryMap(categoryEntities: CategoryEntity[]): {
  [key: string]: CategoryEntity;
} {
  const categoryEntityMap: { [key: string]: CategoryEntity } = {};
  for (const categoryEntity of categoryEntities) {
    categoryEntityMap[categoryEntity.name] = categoryEntity;
  }

  return categoryEntityMap;
}
