import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { addToCart, getCartCount } from "@/lib/cart";
import { toast } from "sonner";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cartCount, setCartCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    setCartCount(getCartCount());
    const category = searchParams.get("category");
    if (category) {
      setSelectedCategory(category.toLowerCase());
    }
  }, [searchParams]);

  const handleAddToCart = (product: { id: string; name: string; price: number; image: string }) => {
    addToCart(product);
    setCartCount(getCartCount());
    toast.success(`${product.name} added to cart!`);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category.toLowerCase() === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartCount={cartCount} />
      <main className="flex-1">
        <section className="py-12 md:py-16 bg-gradient-to-b from-background to-accent/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 animate-fade-up">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Shop All Products</h1>
              <p className="text-muted-foreground text-lg">
                Browse our complete collection of cakes, flowers, and tea
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                onClick={() => handleCategoryChange("all")}
              >
                All Products
              </Button>
              <Button
                variant={selectedCategory === "cakes" ? "default" : "outline"}
                onClick={() => handleCategoryChange("cakes")}
              >
                Cakes
              </Button>
              <Button
                variant={selectedCategory === "flowers" ? "default" : "outline"}
                onClick={() => handleCategoryChange("flowers")}
              >
                Flowers
              </Button>
              <Button
                variant={selectedCategory === "tea" ? "default" : "outline"}
                onClick={() => handleCategoryChange("tea")}
              >
                Tea
              </Button>
            </div>

            {/* Products Grid */}
            <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  category={product.category}
                  onAddToCart={() => handleAddToCart(product)}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12 animate-fade-in">
                <p className="text-muted-foreground text-lg">No products found in this category.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
