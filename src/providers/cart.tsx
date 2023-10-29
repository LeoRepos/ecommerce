"use client";

import { ProductWithTotalPrice } from "@/helpers/product";
import { ReactNode, createContext, useMemo, useState } from "react";

export interface CartProduct extends ProductWithTotalPrice {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  cartTotalPrice: number;
  cartBaseTotal: number;
  cartTotalDiscount: number;
  total: number;
  subtotal: number; 
  totalDiscounts: number;
  addProductToCarts: (product: CartProduct) => void;
  decreaseProductQuantity: (product: string) => void;
  increaseProductQuantity: (product: string) => void;
  removeProductsFromCart: (product: string) => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  cartBaseTotal: 0,
  cartTotalPrice: 0,
  cartTotalDiscount: 0,
  total: 0,
  subtotal: 0,
  totalDiscounts: 0,
  addProductToCarts: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProductsFromCart: () => {},
});

const CarProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);

  // Total sem descontos
  const subtotal = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + Number(product.basePrice) * product.quantity;
    }, 0);
  }, [products]);

  // Total com descontos
  const total = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + Number(product.totalPrice) * product.quantity
    }, 0);
  }, [products]);

  // Total de descontos
  const totalDiscounts = subtotal - total;

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
      prev
        .map((cartProduct) => {
          if (cartProduct.id === productId) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity - 1,
            };
          }

          return cartProduct;
        })
        .filter((cartProduct) => cartProduct.quantity > 0)
    );
  };

  const increaseProductQuantity = (productId: string) => {
    // se a quantidade for 1. remova do carrinho
    // se não, diminua a quantidade
    setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.id === productId) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + 1,
          };
        }

        return cartProduct;
      })
    );
  };

  const removeProductsFromCart = (productId: string) => {
    setProducts((prev) =>
      prev.filter((cartProduct) => cartProduct.id !== productId)
    );
  };

  return (
    <CartContext.Provider
      value={{
        products,
        addProductToCarts,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProductsFromCart,
        total,
        subtotal,
        totalDiscounts,
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
