
const Product = require('../models/product.model');

/**
 * Transforms a raw product object from the database into a populated Product model object.
 * 
 * @param {Object} product - The raw product object retrieved from the database.
 * @returns {Object} A populated Product model object.
 */
function transform(product) {
  // TODO make this hateoas
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
