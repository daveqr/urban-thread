import {ProductEntity} from "../../../entities/product.entity";

class Product {
    productLinks: any[] = [];
    private productEntity: ProductEntity;

    constructor(productEntity: ProductEntity) {
        this.productEntity = productEntity;
    }

    get id(): string {
        return String(this.productEntity.id);
    }

    get name(): string {
        return <string>this.productEntity.name;
    }

    get description(): string {
        return "thedescripton";
        // return this.category.description;
    }

    get editionName(): string {
        return "editionname";
        // return this.category.edition.name;
    }

    get editionDescription(): string {
        return "editionDescription";
        // return this.category.edition.description;
    }

    get products() {
        return [];
        // return this.category.products.map(product => new ProductModel(product));
    }
}

export default Product;
