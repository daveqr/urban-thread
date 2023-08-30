const Product = require('../models/product.model');

/**
 * Transforms a product object into a populated product.
 * @param {Object} category - The product object to be transformed.
 * @returns {Object} The transformed product object.
 */
function transform(product) {
  return new Product(
    product._id,
    product.description,
    product.price,
    product.color
  );
}

module.exports = {
  transform
};
