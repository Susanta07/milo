export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export const getCart = (): CartItem[] => {
  const cart = localStorage.getItem("miloCart");
  return cart ? JSON.parse(cart) : [];
};

export const addToCart = (item: Omit<CartItem, "quantity">) => {
  const cart = getCart();
  const existingItem = cart.find((i) => i.id === item.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  
  localStorage.setItem("miloCart", JSON.stringify(cart));
  return cart;
};

export const removeFromCart = (id: string) => {
  const cart = getCart().filter((item) => item.id !== id);
  localStorage.setItem("miloCart", JSON.stringify(cart));
  return cart;
};

export const updateCartItemQuantity = (id: string, quantity: number) => {
  const cart = getCart();
  const item = cart.find((i) => i.id === id);
  
  if (item) {
    if (quantity <= 0) {
      return removeFromCart(id);
    }
    item.quantity = quantity;
    localStorage.setItem("miloCart", JSON.stringify(cart));
  }
  
  return cart;
};

export const clearCart = () => {
  localStorage.removeItem("miloCart");
  return [];
};

export const getCartCount = (): number => {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
};

export const getCartTotal = (): number => {
  return getCart().reduce((sum, item) => sum + item.price * item.quantity, 0);
};
