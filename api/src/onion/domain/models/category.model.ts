import {CategoryInterface} from '../../../schemas/category.schema';
import ProductModel from './product.model';

class CategoryModel {
    productLinks: any[] = [];
    private category: CategoryInterface;

    constructor(category: CategoryInterface) {
        this.category = category;
    }

    get id(): string {
        return <string>this.category._id;
    }

    get name(): string {
        return this.category.name;
    }

    get description(): string {
        return this.category.description;
    }

    get editionName(): string {
        return this.category.edition.name;
    }

    get editionDescription(): string {
        return this.category.edition.description;
    }

    get products() {
        return this.category.products.map(product => new ProductModel(product));
    }
}

export default CategoryModel;
