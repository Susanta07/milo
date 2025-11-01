import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getProductById } from "@/data/products";
import { addToCart, getCartCount } from "@/lib/cart";
import { toast } from "sonner";
import { ArrowLeft, ShoppingCart } from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  const product = id ? getProductById(id) : null;

  useEffect(() => {
    setCartCount(getCartCount());
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header cartCount={cartCount} />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
            <Button onClick={() => navigate("/shop")}>Back to Shop</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
    }
    setCartCount(getCartCount());
    toast.success(`${quantity} x ${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartCount={cartCount} />
      <main className="flex-1 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-8 animate-fade-in"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="animate-fade-in">
              <div className="rounded-2xl overflow-hidden border border-border shadow-elegant">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            <div className="animate-fade-up space-y-6">
              <div>
                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
                  {product.category}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{product.name}</h1>
                <p className="text-3xl font-bold text-primary">₹{product.price}</p>
              </div>

              <div className="border-t border-b border-border py-6">
                <h2 className="font-semibold text-lg mb-2">Description</h2>
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label htmlFor="quantity" className="font-semibold">
                    Quantity:
                  </label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </Button>
                    <input
                      id="quantity"
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 text-center border border-border rounded-md px-2 py-1"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <Button size="lg" className="w-full md:w-auto" onClick={handleAddToCart}>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
              </div>

              <div className="bg-accent/20 rounded-xl p-6 space-y-2">
                <h3 className="font-semibold mb-4">Product Details</h3>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Category:</span>
                  <span className="font-medium">{product.category}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Product ID:</span>
                  <span className="font-medium">#{product.id}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetails;
