import Product from "../../core/models/product.model";

export default class HighlightedCategoryDto {
    uuid!: string;
    name?: string;
    description?: string;
    position!: number;
    slug!: string;
    editionName?: string;
    editionDescription?: string;
    // products?: ProductDto[];
    products?: Product[];
}