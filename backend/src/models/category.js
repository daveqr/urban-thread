const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  collections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Collection' }],
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
