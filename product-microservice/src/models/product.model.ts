import { Document } from 'mongoose';

export interface Product extends Document {
  id: string;
  name: string;
  description: string;
  price: number;
  color: string;
}
