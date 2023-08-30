import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './models/product.model';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}
}
