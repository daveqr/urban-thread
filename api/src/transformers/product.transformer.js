
const linkUtils = require('../utils/linkUtils');
const { PRODUCT_BASE_URL } = require('../config/urls');

class ProductTransformer {

  /**
   * Transforms a raw product object from the database into a populated Product model object
   * adhering to the HAL JSON standard. Contains embedded category resources.
   * 
   * @param {Object} product - The raw product object retrieved from the database.
   * @param {Object} categoryLinks - An object containing links to related categories.
   * @returns {Object} A populated Product model object.
   */
  static transform(product, categoryLinks, extended) {
    const selfLink = linkUtils.createSelfLink(PRODUCT_BASE_URL, product.id);
    const combinedLinks = linkUtils.combineLinks(selfLink);

    if (extended) {
      // Extended transformation
      const mapCategoriesToEmbedded = (categoryLinks) => {
        return categoryLinks.map(link => ({
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
          categories: mapCategoriesToEmbedded(categoryLinks)
        },
        rel: 'product',
        href: `${PRODUCT_BASE_URL}/${product._id}`,
      };
    } else {
      // Basic transformation
      return {
        rel: 'product',
        href: `${PRODUCT_BASE_URL}/${product._id}`,
        name: product.name,
        description: product.description,
      };
    }
  }

  static groupProductLinksByCategory(categories) {
    const result = {};

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
        const categoryLinks = [];
        for (const product of category.products) {
          const productLink = ProductTransformer.transform(
            product,
            categoryLinks,
            extended
          );
          result[categoryId].push(productLink);
        }
      }
    }

    return result;
  }


}

module.exports = ProductTransformer;
