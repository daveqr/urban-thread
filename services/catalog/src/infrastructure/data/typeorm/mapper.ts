import Category from "../../../core/models/category.model";
import { CategoryEntity } from "./entities/category.entity";
import { ProductEntity } from "./entities/product.entity";
import { Product } from "../../../core/models/product.model";
import { HighlightedCategory } from "../../../core/models/highlighted-category.model";

export function mapToDomainCategories(
  categoryEntities: CategoryEntity[],
): Category[] {
  return categoryEntities.map((categoryEntity) => ({
    uuid: categoryEntity.uuid,
    name: categoryEntity.name,
    description: categoryEntity.description,
    products:
      categoryEntity.products?.map((productEntity) => ({
        uuid: productEntity.uuid,
        name: productEntity.name,
        description: productEntity.description,
        slug: productEntity.slug,
        categories: [], // You should map this properly if needed
      })) ?? [],
    slug: categoryEntity.slug,
  }));
}

export function mapEntityToProduct(productEntity: ProductEntity): Product {
  const categories: Category[] = mapToDomainCategories(
    productEntity.categories,
  );

  return {
    uuid: productEntity.uuid,
    name: productEntity.name,
    description: productEntity.description,
    slug: productEntity.slug,
    categories: categories,
  };
}

export function mapToDomainHighlightedCategories(
  categories: {
    position: number;
    categoryEntity: CategoryEntity;
  }[],
): HighlightedCategory[] {
  return categories.map(({ categoryEntity, position }) => {
    const highlightedCategory: HighlightedCategory = {
      ...categoryEntity,
      products:
        categoryEntity.products?.map((productEntity) => ({
          uuid: productEntity.uuid,
          name: productEntity.name,
          description: productEntity.description,
          slug: productEntity.slug,
          categories: [], // You should map this properly if needed
        })) ?? [],
      position: position,
    };

    return highlightedCategory;
  });
}
