import Product, {ProductInterface} from '../schemas/product.schema';

class ProductModel {
    product: ProductInterface;

    // TODO make this private
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

    static async create(productData: any) {
        const createdProduct = await Product.create(productData);
        return new ProductModel(createdProduct);
    }

    static async find() {
        const products = await Product.find();
        return products.map((product: ProductInterface) => new ProductModel(product));
    }

    static async findById(productId: any) {
        const product = await Product.findById(productId);
        if (!product) {
            return null;
        }
        return new ProductModel(product);
    }
}

export default ProductModel;
