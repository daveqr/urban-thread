import Product from "./product.model";

class Category {
    productLinks: any[] = [];
    private readonly _uuid: string;
    private readonly _description?: string;
    private readonly _name?: string;

    constructor(_uuid: string, name?: string, description?: string, products: Product[] = []) {
        this._uuid = _uuid;
        this._description = description;
        this._name = name;
        this._products = products;
    }

    private _slug?: string;

    get slug(): string {
        return <string>this._slug;
    }

    set slug(slug: string) {
        this._slug = slug;
    }

    private _products: Product[];

    get products(): Product[] {
        return this._products;
    }

    set products(products: Product[]) {
        this._products = products;
    }

    get uuid(): string {
        return this._uuid;
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
}

export default Category;
