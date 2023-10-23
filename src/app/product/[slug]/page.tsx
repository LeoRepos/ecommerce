import { prismaClient } from "@/lib/prisma";

interface ProductDetailPageProps {
  params: {
    slug: string;
  };
}

const ProductsDetailsPage = async ({
  params: { slug },
}: ProductDetailPageProps) => {
  const products = await prismaClient.product.findFirst({
    where: {
      slug: slug,
    },
  });

  return (
    <h1>
        {products?.name}
    </h1>
  )
   
};

export default ProductsDetailsPage;
