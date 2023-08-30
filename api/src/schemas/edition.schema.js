const mongoose = require('mongoose');

/**
 * Represents an edition of apparel collection.
 * @typedef {Object} Edition
 * @property {string} name - The name of the edition.
 * @property {string} description - The description of the edition.
 */
const editionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model('Edition', editionSchema);
