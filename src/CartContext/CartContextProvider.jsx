import React, { useEffect, useState } from "react";
import { createContext } from "react";

export const CartContext = createContext(null);

function CartContextProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("cart");
    if (data) {
      setCart(JSON.parse(data));
    }
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;
