
const linkUtils = require('../utils/halLinkUtils');

/**
 * Transforms a raw product object from the database into a populated Product model object
 * adhering to the HAL JSON standard. Contains embedded category resources.
 * 
 * @param {Object} product - The raw product object retrieved from the database.
 * @returns {Object} A populated Product model object.
 */
function transform(product, categoryLinks, baseUrl) {
  const selfLink = linkUtils.createSelfLink(baseUrl, product._id);
  const combinedLinks = linkUtils.combineLinks(selfLink)

  return {
    id: product._id,
    name: product.name,
    description: product.description,
    price: product.price,
    color: product.color,
    _links: combinedLinks,
    _embedded: {
      categories: mapCategoriesToEmbedded(categoryLinks),
    },
  };
}

function mapCategoriesToEmbedded(categories) {
  return categories.map(category => ({
    categoryId: category.id,
    name: category.name,
    _links: {
      self: {
        href: category.href,
      },
    },
  }));
}

module.exports = {
  transform
};
