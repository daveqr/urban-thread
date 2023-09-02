const Product = require('../models/product.model');

/**
 * Transforms a raw product object from the database into a populated Product model object.
 * 
 * @param {Object} product - The raw product object retrieved from the database.
 * @returns {Object} A populated Product model object.
 */
function transform(product, categoryLinks, baseUrl) {

  const embeddedCategories = {
    categoryList: mapCategoriesToEmbedded(categoryLinks),
  };

  const selfLink = {
    self: {
      href: `${baseUrl}/${product._id}`,
    },
  };

  return {
    _embedded: embeddedCategories,
    id: product._id,
    name: product.name,
    description: product.description,
    price: product.price,
    color: product.color,
    _links: selfLink,
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
