const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  description: { type: String, required: true },
  price: { type: Number, required: true },
  color: { type: String, required: true },
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
