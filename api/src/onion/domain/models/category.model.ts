import {CategoryEntity} from "../../../entities/category.entity";

class Category {
    productLinks: any[] = [];
    private category: CategoryEntity;

    constructor(category: CategoryEntity) {
        this.category = category;
    }

    get id(): string {
        return String(this.category.id);
    }

    get name(): string {
        return <string>this.category.name;
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

export default Category;
