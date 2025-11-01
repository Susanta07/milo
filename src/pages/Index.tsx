import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getFeaturedProducts } from "@/data/products";
import { addToCart, getCartCount } from "@/lib/cart";
import { toast } from "sonner";

const Index = () => {
  const [cartCount, setCartCount] = useState(0);
  const featuredProducts = getFeaturedProducts();

  useEffect(() => {
    setCartCount(getCartCount());
  }, []);

  const handleAddToCart = (product: { id: string; name: string; price: number; image: string }) => {
    addToCart(product);
    setCartCount(getCartCount());
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartCount={cartCount} />
      <main className="flex-1">
        <Hero />
        
        {/* Featured Products Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-fade-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Discover our handpicked selection of premium cakes, flowers, and tea
              </p>
            </div>
            
            <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-12">
              {featuredProducts.map((product) => (
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
            
            <div className="text-center animate-fade-in">
              <Link to="/shop">
                <Button size="lg">View All Products</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 md:py-24 bg-accent/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-fade-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
              <p className="text-muted-foreground text-lg">Find exactly what you're looking for</p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-3">
              <Link to="/shop?category=cakes" className="group">
                <div className="rounded-2xl overflow-hidden bg-card border border-border hover:shadow-elegant transition-all duration-300 animate-scale-in">
                  <div className="p-8 text-center">
                    <div className="mb-4 text-6xl">🎂</div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">Cakes</h3>
                    <p className="text-muted-foreground">Delicious cakes for every celebration</p>
                  </div>
                </div>
              </Link>
              
              <Link to="/shop?category=flowers" className="group">
                <div className="rounded-2xl overflow-hidden bg-card border border-border hover:shadow-elegant transition-all duration-300 animate-scale-in">
                  <div className="p-8 text-center">
                    <div className="mb-4 text-6xl">🌸</div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">Flowers</h3>
                    <p className="text-muted-foreground">Fresh blooms for special moments</p>
                  </div>
                </div>
              </Link>
              
              <Link to="/shop?category=tea" className="group">
                <div className="rounded-2xl overflow-hidden bg-card border border-border hover:shadow-elegant transition-all duration-300 animate-scale-in">
                  <div className="p-8 text-center">
                    <div className="mb-4 text-6xl">🍵</div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">Tea</h3>
                    <p className="text-muted-foreground">Premium tea varieties from India</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-fade-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
              <p className="text-muted-foreground text-lg">Read reviews from our happy customers</p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
              <div className="bg-card border border-border rounded-2xl p-6 animate-fade-in">
                <div className="mb-4">⭐⭐⭐⭐⭐</div>
                <p className="text-muted-foreground mb-4">
                  "The cake was absolutely delicious and beautifully decorated. Everyone at the party loved it!"
                </p>
                <p className="font-semibold">- Priya Sharma</p>
              </div>
              
              <div className="bg-card border border-border rounded-2xl p-6 animate-fade-in">
                <div className="mb-4">⭐⭐⭐⭐⭐</div>
                <p className="text-muted-foreground mb-4">
                  "Fresh flowers delivered right on time. The arrangement was stunning and lasted for days."
                </p>
                <p className="font-semibold">- Rahul Verma</p>
              </div>
              
              <div className="bg-card border border-border rounded-2xl p-6 animate-fade-in">
                <div className="mb-4">⭐⭐⭐⭐⭐</div>
                <p className="text-muted-foreground mb-4">
                  "Best quality tea I've ever ordered online. The Darjeeling blend is exceptional!"
                </p>
                <p className="font-semibold">- Anjali Gupta</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
