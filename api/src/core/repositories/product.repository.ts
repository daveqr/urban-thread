import {Product} from "../models/product.model";

export interface ProductRepository {

    find(): Promise<Product[]>;

    findByUuid(uuid: string): Promise<Product | null>;
}
