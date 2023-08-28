/**
 * Transforms a category object into a populated category.
 * @param {Object} category - The category object to be transformed.
 * @returns {Object} The transformed category object.
 */
function transform(category) {
  const productsList = category.products.map(product => ({
    id: product._id,
    description: product.description,
    price: product.price,
    color: product.color,
  }));

  return {
    id: category._id,
    name: category.name,
    description: category.description,
    edition: {
      id: category.edition._id,
      name: category.edition.name,
      description: category.edition.description,
    },
    products: productsList,
  }
}

module.exports = {
  transform
};
