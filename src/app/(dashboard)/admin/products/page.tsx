"use client"

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Plus } from "lucide-react";
import SearchBar from "@/components/layout/SearchBar";
import ProductsFilter from "./ProductsFilter";
import ProductsTable from "./ProductsTable";
import { Pagination } from "@/components/layout/Pagination";
import { IMinMaxFilterData, IProduct } from "@/interfaces/product.interface";

const mockProducts: IProduct[] = [
  {
    _id: '1',
    name: "Son môi lì Red Velvet",
    category: {
      _id: "1",
      name: "Lips",
    },
    brand: {
      _id: "1",
      name: "3CE",
    },
    stock_quantity: 0,
    selling_price: 320000,
    status: "unpublished",
    image: "https://picsum.photos/200/300",
  },
  {
    _id: '2',
    name: "Kem dưỡng ẩm Hada Labo",
    category: {
      _id: "1",
      name: "Cleanser",
    },
    brand: {
      _id: "1",
      name: "Rohto",
    },
    stock_quantity: 40,
    selling_price: 265000,
    status: "published",
    image: "https://picsum.photos/200/300",
  },
  {
    _id: '3',
    name: "Sữa rửa mặt Innisfree Green Tea",
    category: {
      _id: "1",
      name: "Cleanser",
    },
    brand: {
      _id: "1",
      name: "Innisfree",
    },
    stock_quantity: 30,
    selling_price: 210000,
    status: "published",
    image: "https://picsum.photos/200/300",
  },
  {
    _id: '4',
    name: "Kem chống nắng Anessa Perfect UV",
    category: {
      _id: "1",
      name: "Suncare",
    },
    brand: {
      _id: "1",
      name: "Shiseido",
    },
    stock_quantity: 50,
    selling_price: 480000,
    status: "unpublished",
    image: "https://picsum.photos/200/300",
  },
  {
    _id: '5',
    name: "Phấn phủ Fit Me Matte + Poreless",
    category: {
      _id: "1",
      name: "Makeup",
    },
    brand: {
      _id: "1",
      name: "Maybelline",
    },
    stock_quantity: 35,
    selling_price: 295000,
    status: "published",
    image: "https://picsum.photos/200/300",
  },
  {
    _id: '6',
    name: "Serum Vitamin C Melano CC",
    category: {
      _id: "1",
      name: "Serum",
    },
    brand: {
      _id: "1",
      name: "Rohto",
    },
    stock_quantity: 28,
    selling_price: 350000,
    status: "published",
    image: "https://picsum.photos/200/300",
  },
  {
    _id: '7',
    name: "Toner Simple Kind to Skin",
    category: {
      _id: "1",
      name: "Toner",
    },
    brand: {
      _id: "1",
      name: "Unilever",
    },
    stock_quantity: 32,
    selling_price: 240000,
    status: "published",
    image: "https://picsum.photos/200/300",
  },
  {
    _id: '8',
    name: "Mặt nạ giấy Mediheal Tea Tree",
    category: {
      _id: "1",
      name: "Paper Mask",
    },
    brand: {
      _id: "1",
      name: "Mediheal",
    },
    stock_quantity: 160,
    selling_price: 28000,
    status: "published",
    image: "https://picsum.photos/200/300",
  },
  {
    _id: '9',
    name: "Dầu gội Tsubaki Premium Moist",
    category: {
      _id: "1",
      name: "Hair Care",
    },
    brand: {
      _id: "1",
      name: "Tsubaki",
    },
    stock_quantity: 22,
    selling_price: 310000,
    status: "published",
    image: "https://picsum.photos/200/300",
  },
  {
    _id: '10',
    name: "Nước tẩy trang Bioderma Sensibio H2O",
    category: {
      _id: "1",
      name: "Makeup Remover",
    },
    brand: {
      _id: "1",
      name: "Bioderma",
    },
    stock_quantity: 45,
    selling_price: 420000,
    status: "published",
    image: "https://picsum.photos/200/300",
  },
];

const NullMinMaxFilterData: IMinMaxFilterData = {
  price: { min: 0, max: 0 },
  stock: { min: 0, max: 0 },
}

type ProductKey = "name" | "sku" | "category" | "brand";

export default function ProductsManagement() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [data, setData] = useState<IProduct[]>([]);
  const [minMaxFilterData, setMinMaxFilterData] = useState<IMinMaxFilterData>(NullMinMaxFilterData);
  const [total, setTotal] = useState(0);

  const [searchBy, setSearchBy] = useState<ProductKey>("name");
  const [limit, setLimit] = useState(7);
  const page = Number(searchParams.get("page") || 1) || 1;
  const searchQuery = searchParams.get("q") || "";
  const minPrice = Number(searchParams.get("minPrice") || 0) || 0;
  const maxPrice = Number(searchParams.get("maxPrice") || 0) || 0;
  const minStock = Number(searchParams.get("minStock") || 0) || 0;
  const maxStock = Number(searchParams.get("maxStock") || 0) || 0;
  const status = searchParams.get("status") || "";

  const fetchMinMaxFilter = async () => {
    setMinMaxFilterData({
      price: { min: 10000, max: 2000000 },
      stock: { min: 0, max: 100 },
    })      //fake
  };
  useEffect(() => {
    fetchMinMaxFilter();
  }, []);

  const fetchProducts = async () => {
    setData(mockProducts.slice(0, limit))     //fake
    setTotal(mockProducts.length)
  };
  useEffect(() => {
    fetchProducts();
  }, [page, limit, searchQuery, searchBy, minPrice, maxPrice, minStock, maxStock, status]);

  return (
    <div className="px-8 py-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Products Management
        </h1>
        <Button onClick={() => { router.push("products/new") }}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Product
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <SearchBar placeholder="Search products..." willUpdateQuery className="w-84" />

            <Select value={searchBy} onValueChange={(value: ProductKey) => setSearchBy(value)}>
              <SelectTrigger size="sm" className="w-full sm:w-42">
                <SelectValue placeholder="Search by ..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Product name</SelectItem>
                <SelectItem value="sku">SKU</SelectItem>
                <SelectItem value="category">Category</SelectItem>
                <SelectItem value="brand">Brand</SelectItem>
              </SelectContent>
            </Select>

            <ProductsFilter data={minMaxFilterData} />
          </div>
        </CardHeader>

        <CardContent>
          <Suspense fallback={<Spinner />}>
            <ProductsTable
              data={data || []}
              onView={(id) => { router.push(`products/${id}`) }}
              onEdit={(id) => router.push(`products/${id}/edit`)}
            />
          </Suspense>

          <Pagination total={total} page={page} limit={limit} onLimitChange={setLimit} item="product" />

        </CardContent>
      </Card>
    </div>
  );
}