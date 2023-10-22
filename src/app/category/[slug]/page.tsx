import CategoryItem from "@/app/(home)/components/category-item";
import { Badge } from "@/components/ui/badge";
import ProductItem from "@/components/ui/product-item";
import { CATEGORY_ICON } from "@/constansts/category-icon";
import { computeProductTotalPrice } from "@/helpers/product";
import { prismaClient } from "@/lib/prisma";
import { MouseIcon, ShapesIcon } from "lucide-react";

const CategoryProducts = async ({ params }: any) => {
  const products = await prismaClient.product.findMany({
    where: {
      category: {
        slug: params.slug,
      },
    },
  });
  return (
    <div className="flex flex-col gap-8 p-5">
      <Badge
        className="uppercase w-fit gap-1 rounded-full text-base py-[0.375rem] border-primary border-2 px-3"
        variant={"outline"}
      >
        {CATEGORY_ICON[params.slug as keyof typeof CATEGORY_ICON]}
        {params.slug}
      </Badge>

      <div className="grid grid-cols-2 gap-8">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={computeProductTotalPrice(product)}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
