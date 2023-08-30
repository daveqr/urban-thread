const mongoose = require('mongoose');

/**
 * Represents a product.
 * @typedef {Object} Product
 * @property {string} naem - The name of the product.
 * @property {string} description - The description of the product.
 * @property {number} price - The price of the product.
 * @property {string} color - The color of the product.
 */
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  color: { type: String, required: true },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
