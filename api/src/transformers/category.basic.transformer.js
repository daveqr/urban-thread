/**
 * Transforms a category object into a simplified format.
 * @param {Object} category - The category object to be transformed.
 * @returns {Object} The transformed category object.
 */
function transform(category) {
  return {
    id: category._id,
    name: category.name,
    description: category.description,
    editionName: category.edition ? category.edition.name : null
  };
}

module.exports = {
  transform
};
  