import { prismaClient } from "@/lib/prisma";
import ProductImages from "./components/products-images";

interface ProductDetailPageProps {
  params: {
    slug: string;
  };
}

const ProductsDetailsPage = async ({
  params: { slug },
}: ProductDetailPageProps) => {
  const product = await prismaClient.product.findFirst({
    where: {
      slug: slug,
    },
  });

  if (!product) return null;

  return (
    <div>
        <ProductImages imageUrls={product?.imageUrls} name={product?.name} />
    </div>
  )
   
};

export default ProductsDetailsPage;
