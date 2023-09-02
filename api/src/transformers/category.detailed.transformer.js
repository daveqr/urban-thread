const ProductBasicTranformer = require('./product.basic.transformer');
const Category = require('../models/category.model');

/**
 * Transforms a category object into a populated category.
 * @param {Object} category - The category object to be transformed.
 * @returns {Object} The transformed category object.
 */
function transform(category) {
  // TODO make this hateoas
  const productsList = category.products.map(ProductBasicTranformer.transform);

  return new Category(
    category._id,
    category.name,
    category.description,
    {
      id: category.edition._id,
      name: category.edition.name,
      description: category.edition.description,
    },
    productsList
  );
}

module.exports = {
  transform
};
