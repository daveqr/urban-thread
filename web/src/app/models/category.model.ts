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
      products: Array<{
          rel: string;
          href: string;
          name: string;
          description: string;
      }>;
  };
}
