const mongoose = require('mongoose');

/**
 * Represents a product item.
 * @typedef {Object} Item
 * @property {string} description - The description of the item.
 * @property {number} price - The price of the item.
 * @property {string} color - The color of the item.
 */
const itemSchema = new mongoose.Schema({
  description: { type: String, required: true },
  price: { type: Number, required: true },
  color: { type: String, required: true },
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
