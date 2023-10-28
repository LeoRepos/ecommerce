"use client";

import DiscountBadge from "@/components/ui/discount-badge";
import { Button } from "@/components/ui/button";
import { ProductWithTotalPrice } from "@/helpers/product";
import { CartContext } from "@/providers/cart";
import { ArrowLeftIcon, ArrowRightIcon, TruckIcon } from "lucide-react";
import { useContext, useState } from "react";

interface ProductIndoProps {
  product: ProductWithTotalPrice;
}

const ProductInfo = ({ product }: ProductIndoProps) => {
  const [quantity, setQuantity] = useState(1);

  const { addProductToCarts } = useContext(CartContext);

  const handleClickIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleClickDecrese = () => {
    setQuantity((prev) => (prev === 1 ? prev : prev - 1));
  };

  const handleAddToCartClick = () => {
    addProductToCarts({ ...product, quantity });
  };

  return (
    <div className="flex flex-col px-5">
      <h2 className="text-lg">{product.name}</h2>

      <div className="flex items-center gap-8">
        <h1 className="text-xl font-bold">
          R$ {product.totalPrice.toFixed(2)}
        </h1>
        {product.discountPercentage > 0 && (
          <DiscountBadge>{product.discountPercentage}</DiscountBadge>
        )}
      </div>

      {product.discountPercentage > 0 && (
        <p className="text-sm line-through opacity-75">
          R$ {Number(product.basePrice).toFixed(2)}
        </p>
      )}

      <div className="flex items-center gap-2 mt-4">
        <Button size="icon" variant="outline" onClick={handleClickDecrese}>
          <ArrowLeftIcon size={16} />
        </Button>
        <span>{quantity}</span>
        <Button size="icon" variant="outline" onClick={handleClickIncrease}>
          <ArrowRightIcon size={16} />
        </Button>
      </div>

      <div className="flex flex-col gap-3 mt-8">
        <h3 className="font-bold">Descrição</h3>
        <p className="text-sm opacity-60 text-justify">{product.description}</p>
      </div>

      <Button
        className="mt-8 uppercase font-bold"
        onClick={handleAddToCartClick}
      >
        Adicionar ao carrinho
      </Button>

      <div className="bg-accent flex items-center mt-4 rounded-lg px-6 py-2 justify-between">
        <div className="flex justify-center items-center gap-4">
          <div className="">
            <TruckIcon />
          </div>

          <div className="flex flex-col">
            <div className="text-xs">
              Entrega via <span className="font-bold italic">FSPacket®</span>
            </div>
            <div className="text-primary text-xs">
              Envio para <span className="font-bold">todo Brasil</span>
            </div>
          </div>
        </div>

        <div className="font-bold">Frete Grátis</div>
      </div>
    </div>
  );
};

export default ProductInfo;
