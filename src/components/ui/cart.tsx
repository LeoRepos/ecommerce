import { ShoppingCart } from "lucide-react";
import { Badge } from "./badge";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import CartItem from "./cart-item";
import { computeProductTotalPrice } from "@/helpers/product";
import { Separator } from "./separator";
import { ScrollArea } from "./scroll-area";
import { Button } from "./button";
import { createCheckout } from "@/actions/checkout";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
  const { products, total, subtotal, totalDiscounts } = useContext(CartContext);

  const handleFinishPurchaseClick = async () => {
    const checkout = await createCheckout(products);

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
    stripe?.redirectToCheckout({
      sessionId: checkout.id,
    });
  };

  return (
    <div className="flex flex-col gap-8 h-full">
      <Badge
        className="uppercase gap-1 w-fit rounded-full text-base py-[0.375rem] border-primary border-2 px-3"
        variant={"outline"}
      >
        <ShoppingCart size={16} />
        Carrinho
      </Badge>

      <div className="flex flex-col gap-4 h-full max-h-full overflow-hidden">
        <ScrollArea className="h-full">
          <div className="flex h-full flex-col gap-8">
            {products.length > 0 ? (
              products.map((product) => (
                <CartItem
                  key={product.id}
                  product={computeProductTotalPrice(product as any) as any}
                />
              ))
            ) : (
              <p className="text-center font-semibold">Carrinho está vazio!!</p>
            )}
          </div>
        </ScrollArea>
      </div>

      <div>
        {products.length > 0 && (
          <div className="flex flex-col gap-3 opacity-75">
            <Separator />
            <div className="flex items-center justify-between text-xs">
              <p>Subtotal</p>
              <p>R$ {subtotal.toFixed(2)}</p>
            </div>
            <Separator />
            <div className="flex items-center justify-between text-xs">
              <p>Entrega</p>
              <p className="uppercase">Grátis</p>
            </div>
            <Separator />
            <div className="flex items-center justify-between text-xs">
              <p>Descontos</p>
              <p>R$ {totalDiscounts.toFixed(2)}</p>
            </div>
            <Separator />
            <div className="flex items-center justify-between text-sm font-bold">
              <p>Total</p>
              <p>R$ {total.toFixed(2)}</p>
            </div>
            <Button
              className="text-sm font-bold uppercase mt-6"
              onClick={handleFinishPurchaseClick}
            >
              Finalizar compra
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
