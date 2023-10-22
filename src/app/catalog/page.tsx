import { Badge } from "@/components/ui/badge";
import { ShapesIcon } from "lucide-react";
import CategoryItem from "./components/category-item";
import { prismaClient } from "@/lib/prisma";

const CatalogPage = async () => {
  const categories = await prismaClient.category.findMany();

  return (
    <div className="p-5 flex flex-col gap-8">
      <Badge
        className="uppercase gap-1 w-fit rounded-full text-base py-[0.375rem] border-primary border-2 px-3"
        variant={"outline"}
      >
        <ShapesIcon size={16} />
        Catálogo
      </Badge>

      <div className="grid grid-cols-2 gap-8">
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CatalogPage;
