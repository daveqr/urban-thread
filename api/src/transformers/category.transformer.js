
const linkUtils = require('../utils/linkUtils');

class CategoryTransformer {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  /**
   * Converts a category object into a HAL JSON-compliant populated category,
   * enhanced with embedded product details.
   *
   * @param {Object} category - The category object to be transformed.
   * @param {Object} productLinks - An object containing links to related products.
   * @returns {Object} The transformed category object with specific formatting.
   *
   * @example <caption>Transformed category.</caption>
   * {
   *   id: '64f37a6038d4bb6edd24a07e',
   *   name: 'Silk Dresses',
   *   description: 'Collection of silk dresses for Pre-fall season.',
   *   edition_name: 'Pre-fall',
   *   edition_description: 'Collection for the fall season.',
   *   _links: {
   *     self: {
   *       href: 'https://api.example.com/categories/64f37a6038d4bb6edd24a07e'
   *     }
   *   },
   *   _embedded: {
   *     products: {
   *       rel: 'product',
   *       href: '/products/64f37a6038d4bb6edd24a06e',
   *       name: 'Chips'
   *     }
   *   }
   * }
   */
  transform(category) {
    const selfLink = linkUtils.createSelfLink(this.baseUrl, category.id);
    const combinedLinks = linkUtils.combineLinks(selfLink);

    return {
      id: category.id,
      name: category.name,
      description: category.description,
      edition_name: category.edition_name,
      edition_description: category.edition_description,
      _links: combinedLinks,
      _embedded: {
        products: category.productLinks
      },
    };
  }
}

module.exports = CategoryTransformer;