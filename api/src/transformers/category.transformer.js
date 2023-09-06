
const linkUtils = require('../utils/linkUtils');
const { CATEGORY_BASE_URL } = require('../config/urls');

class CategoryTransformer {

  /**
   * Converts a category object into a HAL+JSON object.
   *
   * @param {Object} categoryModel - The category object to be transformed.
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
   *       href: '/categories/64f37a6038d4bb6edd24a07e'
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
  static transform(categoryModel) {
    const selfLink = linkUtils.createSelfLink(CATEGORY_BASE_URL, categoryModel.id);
    const combinedLinks = linkUtils.combineLinks(selfLink);

    return {
      id: categoryModel.id,
      name: categoryModel.name,
      description: categoryModel.description,
      editionName: categoryModel.category.edition.name,
      editionDescription: categoryModel.category.edition.description,
      _links: combinedLinks,
      _embedded: {
        products: categoryModel.productLinks
      },
    };
  }
}

module.exports = CategoryTransformer;