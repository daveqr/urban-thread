class Category {
    productLinks: any[] = [];
    private readonly _id: number;
    private readonly _description?: string;
    private readonly _name?: string;

    constructor(id: number, name?: string, description?: string) {
        this._id = id;
        this._description = description;
        this._name = name;
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

export default Category;
