import Product from "./product.model";
import Category from "./category.model";

class HighlightedCategory extends Category {
    constructor(_uuid: string, name: string, products: Product[], position: number, description?: string) {
        super(_uuid, name, description, products);
        this._position = position;
    }

    private _position: number;

    get position(): number {
        return this._position;
    }

    set position(position: number) {
        this._position = position;
    }
}

export default HighlightedCategory;
