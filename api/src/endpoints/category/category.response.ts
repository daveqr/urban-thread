import {Product} from "../../core/models/product.model";
import {ResourceLinks} from "../hateoas.interfaces";

interface CategoryResponse {
    id: string;
    name?: string;
    description?: string;
    slug?: string;
    position: number;
    editionName?: string;
    editionDescription?: string;
    products: Product[];
    _links: ResourceLinks;
    _embedded?: {
        products?: Product[];
    };
}
