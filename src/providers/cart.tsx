"use client";

import { ProductWithTotalPrice } from "@/helpers/product";
import { ReactNode, createContext, useState } from "react";

export interface CartProduct extends ProductWithTotalPrice {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  cartTotalPrice: number;
  cartBaseTotal: number;
  cartTotalDiscount: number;
  addProductToCarts: (product: CartProduct) => void;
  decreaseProductQuantity: (product: string) => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  cartBaseTotal: 0,
  cartTotalPrice: 0,
  cartTotalDiscount: 0,
  addProductToCarts: () => {},
  decreaseProductQuantity: () => {},
});

const CarProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);

  const addProductToCarts = (product: CartProduct) => {
    // se o produto já estiver no carrinho, apenas aumente a sua quantidade
    const productAlreadyOnCart = products.some(
      (cartProduct) => cartProduct.id === product.id
    );

    if (productAlreadyOnCart) {
      setProducts((prev) =>
        prev.map((cartProduct) => {
          if (cartProduct.id === product.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + product.quantity,
            };
          }

          return cartProduct;
        })
      );

      return;
    }
    // se não, adicione o produto à lista
    setProducts((prev) => [...prev, product]);
  };

  const decreaseProductQuantity = (productId: string) => {
    // se a quantidade for 1. remova do carrinho
    // se não, diminua a quantidade
    setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.id === productId) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity - 1,
          };
        }

        return cartProduct;
      }).filter((cartProduct) => cartProduct.quantity > 0),
    );
  };

  return (
    <CartContext.Provider
      value={{
        products,
        addProductToCarts,
        decreaseProductQuantity,
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
