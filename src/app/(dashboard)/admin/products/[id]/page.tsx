"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, } from "lucide-react";
import { IProductDetail } from "@/interfaces/product.interface";
import StatsCard from "./StatsCard";
import AnalyticsTab from "./AnalyticsTab";
import DetailsTab from "./DetailsTab";
import { useRouter } from "next/navigation";

const mockProduct: IProductDetail = {
  _id: '1',
  sku: 'CLS-001',
  name: "Sữa rửa mặt dưỡng ẩm tối ưu Hada Labo Advanced Nourish Cleanser 80g",
  category: "Cleanser",
  brand: "Hada Labo",
  selling_price: 100000,
  import_price: 50000,
  description: "Kem rửa mặt Hada Labo dưỡng ẩm với công dụng làm sạch sâu cùng hệ dưỡng ẩm sâu giúp dưỡng da ẩm mượt, sáng mịn, tươi trẻ mỗi ngày",
  image: 'https://picsum.photos/200/300',
  stock_quantity: 45,
  totalSold: 234,
  totalRevenue: 23400000,
  status: "Published",
  createdDate: "2024-08-15",
  lastUpdated: "2024-09-20",
  lastImportDate: "2025-01-05",
};

export default function ProductDetail() {
  const router = useRouter();
  const [product, setProduct] = useState<IProductDetail>(mockProduct);

  return (
    <div className="px-8 py-6 space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex-1 mr-10">
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <p className="text-muted-foreground">{product.category} • SKU: {product.sku}</p>
        </div>

        <Button
          variant={product.status === "Published" ? "destructive" : "outline"}
          onClick={() => { }}
        >
          {product.status === "Published" ? "Unpublish" : "Publish"} Product
        </Button>

        <Button
          onClick={() => { router.push(`new-product`); }}
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit Product
        </Button>
      </div>

      <StatsCard product={product} />

      <Tabs defaultValue="details" className="w-full space-y-1">
        <TabsList className="space-x-2">
          <TabsTrigger value="details">Product Details</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6">
          <DetailsTab product={product} />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <AnalyticsTab product={product} />
        </TabsContent>
      </Tabs>
    </div>
  );
}