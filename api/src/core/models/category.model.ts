import {Product} from "./product.model";

class Category {
    productLinks: any[] = [];
    uuid: string;
    description?: string;
    name?: string;
    slug?: string;
    products: Product[];

    constructor(uuid: string, name?: string, description?: string, products: Product[] = []) {
        this.uuid = uuid;
        this.description = description;
        this.name = name;
        this.products = products;
    }

    get editionName(): string {
        return "editionname";
        // return this.category.edition.name;
    }

    get editionDescription(): string {
        return "editionDescription";
        // return this.category.edition.description;
    }
}

export default Category;
