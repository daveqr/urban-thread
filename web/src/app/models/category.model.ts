export interface Category {
    id: string;
    name: string;
    description: string;
    editionName: string;
    editionDescription: string;
    _links: {
        self: {
            href: string;
        };
    };
    _embedded: {
        // TODO extract the products to its own model 
        products: Array<{
            id: string;
            rel: string;
            href: string;
            name: string;
            description: string;
        }>;
    };
}
