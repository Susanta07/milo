import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getCart, updateCartItemQuantity, removeFromCart, getCartTotal, clearCart, CartItem } from "@/lib/cart";
import { toast } from "sonner";
import { Trash2, ShoppingBag } from "lucide-react";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });

  useEffect(() => {
    setCartItems(getCart());
  }, []);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    updateCartItemQuantity(id, newQuantity);
    setCartItems(getCart());
  };

  const handleRemove = (id: string, name: string) => {
    removeFromCart(id);
    setCartItems(getCart());
    toast.success(`${name} removed from cart`);
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.address) {
      toast.error("Please fill in all required fields");
      return;
    }

    const orderDetails = cartItems
      .map((item) => `${item.name} x${item.quantity} - ₹${item.price * item.quantity}`)
      .join("\n");

    const total = getCartTotal();
    const message = `
*New Order from MILO*

*Customer Details:*
Name: ${formData.name}
Phone: ${formData.phone}
Address: ${formData.address}
${formData.notes ? `Notes: ${formData.notes}` : ""}

*Order Items:*
${orderDetails}

*Total Amount: ₹${total}*
    `.trim();

    const whatsappUrl = `https://wa.me/918001627251?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    clearCart();
    setCartItems([]);
    setShowCheckout(false);
    toast.success("Order sent! We'll contact you soon.");
    
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const total = getCartTotal();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header cartCount={0} />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center animate-fade-in space-y-6 px-4">
            <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground" />
            <h1 className="text-3xl md:text-4xl font-bold">Your Cart is Empty</h1>
            <p className="text-muted-foreground text-lg">Add some products to get started!</p>
            <Button size="lg" onClick={() => navigate("/shop")}>
              Continue Shopping
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} />
      <main className="flex-1 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8 animate-fade-up">Shopping Cart</h1>

          <div className="space-y-4 mb-8">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 bg-card border border-border rounded-xl p-4 animate-fade-in"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-primary font-semibold">₹{item.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    >
                      -
                    </Button>
                    <span className="w-12 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col justify-between items-end">
                  <p className="font-bold text-lg">₹{item.price * item.quantity}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemove(item.id, item.name)}
                  >
                    <Trash2 className="h-5 w-5 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-accent/20 rounded-xl p-6 mb-8 animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-3xl font-bold text-primary">₹{total}</span>
            </div>
            <Button size="lg" className="w-full" onClick={() => setShowCheckout(true)}>
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </main>

      <Dialog open={showCheckout} onOpenChange={setShowCheckout}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delivery Details</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCheckout} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="address">Delivery Address *</Label>
              <Textarea
                id="address"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="notes">Special Instructions (Optional)</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={2}
              />
            </div>
            <Button type="submit" className="w-full" size="lg">
              Confirm Order (Send via WhatsApp)
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Cart;
