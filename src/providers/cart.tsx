"use client"

import { Product } from "@prisma/client";
import { ReactNode, createContext } from "react";

interface CartProduct extends Product {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  cartTotalPrice: number;
  cartBaseTotal: number;
  cartTotalDiscount: number;
}

const CartContext = createContext<ICartContext>({
  products: [],
  cartBaseTotal: 0,
  cartTotalPrice: 0,
  cartTotalDiscount: 0,
});

const CarProvider = ({ children }: { children: ReactNode}) => {
  return (
    <CartContext.Provider
      value={{
        products: [],
        cartTotalPrice: 0,
        cartBaseTotal: 0,
        cartTotalDiscount: 0,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CarProvider;
