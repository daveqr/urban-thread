import { PRODUCT_BASE_URL } from '../config/urls';
import ProductModel from '../models/product.model';
import CategoryModel from '../models/category.model';
import { createSelfLink, combineLinks } from '../utils/linkUtils';

interface CategoryLink {
  id: string;
  name: string;
  href: string;
}

class ProductTransformer {
  static transform(product: ProductModel, categoryLinks: CategoryLink[], extended?: boolean): any {
    const selfLink = createSelfLink(PRODUCT_BASE_URL, product.id);
    const combinedLinks = combineLinks(selfLink);

    if (extended) {
      const mapCategoriesToEmbedded = (categoryLinks: CategoryLink[]) => {
        return categoryLinks.map((link) => ({
          categoryId: link.id,
          name: link.name,
          _links: {
            self: {
              href: link.href,
            },
          },
        }));
      };

      return {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        color: product.color,
        _links: combinedLinks,
        _embedded: {
          categories: mapCategoriesToEmbedded(categoryLinks),
        },
        rel: 'product',
        href: `${PRODUCT_BASE_URL}/${product.id}`,
      };
    } else {
      return {
        rel: 'product',
        href: `${PRODUCT_BASE_URL}/${product.id}`,
        name: product.name,
        description: product.description,
      };
    }
  }

  static groupProductLinksByCategory(categories: CategoryModel[]): Record<string, any[]> {
    const result: Record<string, any[]> = {};

    for (const category of categories) {
      const categoryId = category.id;
      const hasNoProducts = !category.products || category.products.length === 0;

      if (hasNoProducts) {
        result[categoryId] = [];
      } else {
        const isNewCategory = !result[categoryId];

        if (isNewCategory) {
          result[categoryId] = [];
        }

        const extended = false;
        const categoryLinks: CategoryLink[] = [];
        for (const product of category.products) {
          const productLink = ProductTransformer.transform(product, categoryLinks, extended);
          result[categoryId].push(productLink);
        }
      }
    }

    return result;
  }
}

export default ProductTransformer;