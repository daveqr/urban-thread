// TODO need to clean this up
export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageSrc: string;
    color: string;
    _links: {
        self: {
            href: string;
        };
    };
    _embedded: {
        categories: {
            name: string;
            _links: {
                self: {
                    href: string;
                };
            };
        }[];
    };
    rel: string;
    href: string;
}
