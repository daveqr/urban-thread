import {ProductDto} from "./product.dto";

export class CategoryDto {
    id: string | undefined;
    name: string | undefined;
    description: string | undefined;
    editionName: string | undefined;
    editionDescription: string | undefined;
    products: ProductDto[] | undefined;
}