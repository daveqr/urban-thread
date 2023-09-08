import mongoose, { Document, Model, Schema } from 'mongoose';

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  color: { type: String, required: true },
  categoryIds: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
});

export interface ProductInterface extends Document {
  name: string;
  description: string;
  price: number;
  color: string;
  categoryIds: mongoose.Types.ObjectId[];
}

const Product: Model<ProductInterface> = mongoose.model<ProductInterface>('Product', productSchema);

export default Product;