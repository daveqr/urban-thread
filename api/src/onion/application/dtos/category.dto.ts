import Product from "../../domain/models/product.model";

export class CategoryDto {
    id?: string;
    name?: string;
    description?: string;
    editionName?: string;
    editionDescription?: string;
    // products?: ProductDto[];
    products?: Product[];
}