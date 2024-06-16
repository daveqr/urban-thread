import Category from "./category.model";

class Product {
    productLinks: any[] = [];
    id: number;
    description?: string;
    name?: string;
    slug: string;
    categories: Category[];

    constructor(id: number, name?: string, description?: string, categories: Category[] = [], slug: string = '') {
        this.id = id;
        this.description = description;
        this.name = name;
        this.slug = slug;
        this.categories = categories;
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
