"use client"

import { Product } from "@prisma/client";
import { ReactNode, createContext, useState } from "react";

interface CartProduct extends Product {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  cartTotalPrice: number;
  cartBaseTotal: number;
  cartTotalDiscount: number;
  addProductToCarts: (product: CartProduct) => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  cartBaseTotal: 0,
  cartTotalPrice: 0,
  cartTotalDiscount: 0,
  addProductToCarts: () => {},
});

const CarProvider = ({ children }: { children: ReactNode}) => {

    const [products, setProducts] = useState<CartProduct[]>([]);

    const addProductToCarts = (product: CartProduct) => {
        setProducts((prev) => [...prev, product]);
    }

  return (
    <CartContext.Provider
      value={{
        products,
        addProductToCarts,
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
