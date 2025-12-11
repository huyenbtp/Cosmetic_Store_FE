"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ImageWithFallback } from "@/components/layout/ImageWithFallback";

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  brand: string;
}

interface ProductsGridProps {
  data: Product[];
  handleAddToCart: (item: Product) => void;
}
export default function ProductsGrid({
  data,
  handleAddToCart,
}: ProductsGridProps) {
  if (data.length === 0) return (
    <div className="text-center py-12 text-muted-foreground">
      No products found
    </div>
  );
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {data.map((item) => (
          <Card
            key={item._id}
            className="hover:shadow-md transition-shadow cursor-pointer py-4"
            onClick={() => handleAddToCart(item)}
          >
            <CardContent className="space-y-4 px-4">
              <ImageWithFallback
                src={item.image}
                alt={item.name}
                className="w-full h-50 object-cover rounded-xl"
              />
              <div className="">
                <h4 className="font-medium text-sm truncate ">{item.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">{item.brand}</p>
                <Badge variant="secondary" className="mt-2 text-xs">
                  {item.category}
                </Badge>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-semibold text-green-600 dark:text-success1-foreground">
                    {item.price.toLocaleString()} ₫
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Stock: {item.stock}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}