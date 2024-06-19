import {Product} from "./product.model";

export interface Categoryx {
    uuid: string;
    name?: string;
    description?: string;
    products: Product[];
    editionName?: string;
    editionDescription?: string;
    slug: string;
}
