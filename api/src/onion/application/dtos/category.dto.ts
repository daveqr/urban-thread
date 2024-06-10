import {ProductDto} from "./product.dto";

export class CategoryDto {
    id?: string;
    name?: string;
    description?: string;
    editionName?: string;
    editionDescription?: string;
    products?: ProductDto[];
}