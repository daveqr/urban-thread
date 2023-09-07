import { PRODUCT_BASE_URL } from '../config/urls';
import * as linkUtils from '../utils/linkUtils'; // Assuming you have a linkUtils module

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  color: string;
}

interface CategoryLink {
  id: string;
  name: string;
  href: string;
}

export class ProductTransformer {
  static transform(product: Product, categoryLinks: CategoryLink[], extended?: boolean): any {
    const selfLink = linkUtils.createSelfLink(PRODUCT_BASE_URL, product.id);
    const combinedLinks = linkUtils.combineLinks(selfLink);

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

  static groupProductLinksByCategory(categories: any): Record<string, any[]> {
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

        const extended = false; // Adjust this as needed
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
