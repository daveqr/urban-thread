const mongoose = require('mongoose');

/**
 * Represents a product category.
 * @typedef {Object} Category
 * @property {string} name - The name of the category.
 * @property {mongoose.Schema.Types.ObjectId} edition - The reference to an Edition for the category.
 * @property {string} description - A description of the category.
 */

const categorySchema = new mongoose.Schema({

  name: { type: String, required: true },
  edition: { type: mongoose.Schema.Types.ObjectId, ref: 'Edition', required: true }, 
  description: { type: String, required: true },
});

module.exports = mongoose.model('Category', categorySchema);
