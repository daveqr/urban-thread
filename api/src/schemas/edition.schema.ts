import mongoose, { Document } from 'mongoose';

export interface EditionInterface extends Document {
  name: string;
  description: string;
}

const editionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

export default mongoose.model<EditionInterface>('Edition', editionSchema);
