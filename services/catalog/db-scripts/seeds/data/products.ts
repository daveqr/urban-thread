interface ProductSeed {
  name: string;
  description: string;
  categories: string[];
}

const productSeeds: ProductSeed[] = [
  {
    name: "Men's T-Shirt",
    description: "A comfortable cotton t-shirt for men.",
    categories: ["Men's Clothing"],
  },
  {
    name: "Women's Dress",
    description: "A stylish summer dress for women.",
    categories: ["Women's Clothing"],
  },
  {
    name: "Kid's Jeans",
    description: "Durable jeans for kids.",
    categories: ["Kid's Clothing"],
  },
  {
    name: "Silk Evening Gown",
    description: "An exquisite silk gown for special occasions.",
    categories: ["Silk Dresses"],
  },
  {
    name: "Business Suit",
    description: "A formal suit tailored for business professionals.",
    categories: ["Suits"],
  },
  {
    name: "Festival Outfit",
    description: "Colorful attire perfect for festivals.",
    categories: ["Festival"],
  },
  {
    name: "Exclusive Showroom Item",
    description: "An exclusive item available only in our showroom.",
    categories: ["Showroom"],
  },
];

export default productSeeds;
