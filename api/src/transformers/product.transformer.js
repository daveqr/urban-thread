/**
 * Transforms a product object into a populated product.
 * @param {Object} category - The product object to be transformed.
 * @returns {Object} The transformed product object.
 */
function transform(product) {
  const product = product.map(product => ({
    id: product._id,
    description: product.description,
    price: product.price,
    color: product.color,
  }));

  return product
}

module.exports = {
  transform
};
