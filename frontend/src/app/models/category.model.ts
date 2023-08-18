export interface Category {
    _id: string;
    name: string;
    edition: {
      _id: string;
      name: string;
      description: string;
    };
    description: string;
    __v: number;
  }
  