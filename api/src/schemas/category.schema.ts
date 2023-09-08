import mongoose, { Document } from 'mongoose';
import { EditionInterface } from './edition.schema';
import { ProductInterface } from './product.schema';

export interface CategoryInterface extends Document {
  name: string;
  edition: EditionInterface;
  description: string;
  products: ProductInterface[];
}

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  edition: { type: mongoose.Schema.Types.ObjectId, ref: 'Edition', required: true },
  description: { type: String, required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
});

export default mongoose.model<CategoryInterface>('Category', categorySchema);
