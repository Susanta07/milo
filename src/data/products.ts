import cakeImage from "@/assets/cake-featured.jpg";
import flowersImage from "@/assets/flowers-featured.jpg";
import teaImage from "@/assets/tea-featured.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: "Cakes" | "Flowers" | "Tea";
  description: string;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Floral Elegance Cake",
    price: 1499,
    image: cakeImage,
    category: "Cakes",
    description: "A beautiful cake decorated with fresh edible flowers, perfect for celebrations. Made with premium ingredients and elegant frosting.",
    featured: true,
  },
  {
    id: "2",
    name: "Premium Rose Bouquet",
    price: 899,
    image: flowersImage,
    category: "Flowers",
    description: "An exquisite arrangement of fresh roses and exotic flowers, perfect for expressing your feelings on any special occasion.",
    featured: true,
  },
  {
    id: "3",
    name: "Artisan Tea Collection",
    price: 599,
    image: teaImage,
    category: "Tea",
    description: "A curated selection of premium Indian tea varieties, including Darjeeling, Assam, and specialty blends.",
    featured: true,
  },
  {
    id: "4",
    name: "Chocolate Truffle Cake",
    price: 1299,
    image: cakeImage,
    category: "Cakes",
    description: "Rich chocolate cake with velvety truffle layers. A chocolate lover's dream dessert.",
  },
  {
    id: "5",
    name: "Mixed Flower Basket",
    price: 1199,
    image: flowersImage,
    category: "Flowers",
    description: "A vibrant basket filled with seasonal flowers, bringing joy and color to any space.",
  },
  {
    id: "6",
    name: "Masala Chai Collection",
    price: 399,
    image: teaImage,
    category: "Tea",
    description: "Traditional Indian spiced tea blend with cardamom, ginger, and aromatic spices.",
  },
  {
    id: "7",
    name: "Red Velvet Delight",
    price: 1399,
    image: cakeImage,
    category: "Cakes",
    description: "Classic red velvet cake with cream cheese frosting. Moist, delicious, and visually stunning.",
  },
  {
    id: "8",
    name: "Lily & Rose Combo",
    price: 1499,
    image: flowersImage,
    category: "Flowers",
    description: "An elegant combination of lilies and roses, perfect for weddings and special celebrations.",
  },
  {
    id: "9",
    name: "Green Tea Premium",
    price: 499,
    image: teaImage,
    category: "Tea",
    description: "High-quality green tea leaves with antioxidants. Perfect for a healthy lifestyle.",
  },
];

export const getFeaturedProducts = () => products.filter((p) => p.featured);

export const getProductsByCategory = (category: string) =>
  products.filter((p) => p.category.toLowerCase() === category.toLowerCase());

export const getProductById = (id: string) => products.find((p) => p.id === id);
