export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  sizes: string[];
  colors: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "Black Hoodie",
    price: 89.99,
    image: "/images/product1.jpg",
    category: "Hoodies",
    description: "A comfortable and stylish black hoodie perfect for urban streetwear.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Gray", "Navy"]
  },
  {
    id: 2,
    name: "Navy Track Jacket",
    price: 79.99,
    image: "/images/product2.jpg",
    category: "Jackets",
    description: "Stylish navy track jacket with STREETWEAR logo on the back.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Navy", "Black", "Gray"]
  },
  {
    id: 3,
    name: "Black Track Jacket",
    price: 79.99,
    image: "/images/product3.jpg",
    category: "Jackets",
    description: "Modern black track jacket with white stripes and STREETWEAR branding.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Gray"]
  },
  {
    id: 4,
    name: "Graphic T-Shirt",
    price: 39.99,
    image: "/images/product4.jpg",
    category: "T-Shirts",
    description: "Black STREETWEAR t-shirt with bold back logo design.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White", "Gray"]
  },
  {
    id: 5,
    name: "Navy Track Pants",
    price: 69.99,
    image: "/images/product5.jpg",
    category: "Pants",
    description: "Comfortable navy track pants with white piping detail.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Navy", "Black", "Gray"]
  },
  {
    id: 6,
    name: "Black Track Pants",
    price: 69.99,
    image: "/images/product6.jpg",
    category: "Pants",
    description: "Athletic black track pants with white stripe detailing.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Gray"]
  }
]; 