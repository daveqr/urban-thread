
const linkUtils = require('../utils/linkUtils');

class ProductTransformer {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  /**
   * Transforms a raw product object from the database into a populated Product model object
   * adhering to the HAL JSON standard. Contains embedded category resources.
   * 
   * @param {Object} product - The raw product object retrieved from the database.
   * @param {Object} categoryLinks - An object containing links to related categories.
   * @returns {Object} A populated Product model object.
   */
  transform(product, categoryLinks) {
    const selfLink = linkUtils.createSelfLink(this.baseUrl, product._id);
    const combinedLinks = linkUtils.combineLinks(selfLink);

    // helper method to convert the category links to a hal+json compliant list
    const mapCategoriesToEmbedded = (categoryLinks) => {
      return categoryLinks.map(link => ({
        categoryId: link.id,
        name: link.name,
        _links: {
          self: {
            href: link.href,
          },
        },
      }));
    };

    return {
      id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      color: product.color,
      _links: combinedLinks,
      _embedded: {
        categories: mapCategoriesToEmbedded(categoryLinks)
      },
    };
  }
}

module.exports = ProductTransformer;
