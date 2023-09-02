const linkUtils = require('../utils/halLinkUtils');

/**
 * Transforms a raw product object from the database into a populated Product model object.
 * 
 * @param {Object} product - The raw product object retrieved from the database.
 * @returns {Object} A populated Product model object.
 */
function transform(product, categoryLinks, baseUrl) {
  const selfLink = linkUtils.createSelfLink(baseUrl, product._id);
  const combinedLinks = linkUtils.combineLinks(selfLink)
  
  return {
    _embedded: {
      categories: mapCategoriesToEmbedded(categoryLinks),
    },
    id: product._id,
    name: product.name,
    description: product.description,
    price: product.price,
    color: product.color,
    _links: combinedLinks
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
