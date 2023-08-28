export interface Category {
    id: string;
    name: string;
    description: string;
    edition: {
      id: string;
      name: string;
      description: string;
    };
    products: [{
      id: string;
      description: string;
      price: string;
      color: string;
    }]
  }
  