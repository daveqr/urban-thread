import Product from "./product.model";
import Category from "./category.model";

class HighlightedCategory extends Category {
    position: number;

    constructor(uuid: string, name: string, products: Product[], position: number, description?: string) {
        super(uuid, name, description, products);
        this.position = position;
    }
}

export default HighlightedCategory;
