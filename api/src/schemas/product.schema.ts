import mongoose from 'mongoose';

export const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  color: { type: String, required: true },
  categoryIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
});
