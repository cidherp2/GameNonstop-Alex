import { createContext, useContext, useState } from 'react';
const emptyCart = {};
export const CartContext = createContext();
export const useCartContext = () => useContext(CartContext);
const storedCart = localStorage.getItem('cart');
const cartMemory = JSON.parse(storedCart);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(cartMemory);
    
    return (
      <CartContext.Provider value={{ cart, setCart }}>
        {children}
      </CartContext.Provider>
    );
  };