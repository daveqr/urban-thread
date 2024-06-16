import Product from "../../core/models/product.model";

export class CategoryDto {
    uuid!: string;
    name?: string;
    description?: string;
    slug?: string;
    editionName?: string;
    editionDescription?: string;
    // products?: ProductDto[];
    products?: Product[];
}