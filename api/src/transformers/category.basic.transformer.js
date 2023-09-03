
const linkUtils = require('../utils/linkUtils');

/**
 * Transforms a category object into a simplified format.
 * @param {Object} category - The category object to be transformed.
 * @returns {Object} The transformed category object.
 */
function transform(category, baseUrl, productLinks) {
  const selfLink = linkUtils.createSelfLink(baseUrl, category._id);
  const combinedLinks = linkUtils.combineLinks(selfLink);

  return {
    id: category._id,
    name: category.name,
    description: category.description,
    editionName: category.edition ? category.edition.name : null,
    _links: combinedLinks,
    _embedded: {
      products: productLinks
    },
  };
}

module.exports = {
  transform
};
