import {ProductInterface} from '../../../schemas/product.schema';

class ProductModel {
    product: ProductInterface;

    constructor(product: ProductInterface) {
        this.product = product;
    }

    get id(): string {
        return <string>this.product._id;
    }

    get name(): string {
        return this.product.get('name');
    }

    get description(): string {
        return this.product.get('description');
    }

    get price() {
        return this.product.get('price');
    }

    get color(): string {
        return this.product.get('color');
    }

    get categoryIds() {
        return this.product.get('categoryIds');
    }
}

export default ProductModel;
