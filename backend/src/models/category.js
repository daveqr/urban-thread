const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  edition: { type: mongoose.Schema.Types.ObjectId, ref: 'Edition', required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model('Category', categorySchema);
