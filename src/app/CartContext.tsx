import React, { createContext, useContext, useState, ReactNode } from "react";

interface Product {
  id: number;
  image: string;
  title: string;
  price: number;
}

interface CartProviderProps {
  children: ReactNode;
}

// Create Cart Context
const CartContext = createContext<{
  cartItems: Product[];
  addToCart: (product: Product) => void;
}>({
  cartItems: [],
  addToCart: () => {},
});

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCartItems([...cartItems, product]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
