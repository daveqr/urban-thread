import Category from "./category.model";

class Product {
    productLinks: any[] = [];
    private readonly _id: number;
    private readonly _description?: string;
    private readonly _name?: string;

    constructor(id: number, name?: string, description?: string, categories: Category[] = []) {
        this._id = id;
        this._description = description;
        this._name = name;
        this._categories = categories;
    }

    private _categories: Category[];

    get categories(): Category[] {
        return this._categories;
    }

    set categories(products: Category[]) {
        this._categories = products;
    }

    get id(): number {
        return this._id;
    }

    get name(): string | undefined {
        return this._name;
    }

    get description(): string | undefined {
        return this._description;
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
