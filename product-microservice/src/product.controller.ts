import {
  Controller,
  Get,
  Param,
  NotFoundException,
  ParseUUIDPipe,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ProductService } from './services/product.service';
import { logger } from './winston.config';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @MessagePattern({ cmd: 'hello' })
  hello(input?: string): string {
    logger.info('In the microservice');
    return `Hello, ${input || 'there'}!`;
  }

  @MessagePattern({ cmd: 'fetchProduct' })
  // async getProductById(@Param('id', new ParseUUIDPipe()) id: string) {
  fetchProduct(input?: string) {
    try {
      // const product = await this.productService.findById(id);

      // if (!product) {
      //   throw new NotFoundException('Product not found');
      // }

      // return product;

      const id = '123';
      logger.info('returning id: ' + input);
      return {
        id: id,
        name: 'Sample Product',
        description: 'This is a test descr.',
        price: 10.99,
        color: 'Red',
      };
    } catch (error) {
      throw new NotFoundException('Product not found');
    }
  }
}
