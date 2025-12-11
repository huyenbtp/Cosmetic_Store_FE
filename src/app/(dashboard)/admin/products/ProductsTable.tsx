"use client"

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronRight } from "lucide-react";
import { ImageWithFallback } from "@/components/layout/ImageWithFallback";
import { useSearchParams } from "next/navigation";
import SearchBar from "@/components/layout/SearchBar";
import { Pagination } from "@/components/layout/Pagination";
import { IProduct } from "@/interfaces/product.interface";

const mockProducts: IProduct[] = [
  {
    _id: '1',
    name: "Son môi lì Red Velvet",
    category: "Trang điểm",
    brand: "3CE",
    stock_quantity: 0,
    selling_price: 320000,
    status: "Unpublished",
    image: "https://picsum.photos/200/300",
  },
  {
    _id: '2',
    name: "Kem dưỡng ẩm Hada Labo",
    category: "Chăm sóc da",
    brand: "Rohto",
    stock_quantity: 40,
    selling_price: 265000,
    status: "Published",
    image: "https://picsum.photos/200/300",
  },
  {
    _id: '3',
    name: "Sữa rửa mặt Innisfree Green Tea",
    category: "Chăm sóc da",
    brand: "Innisfree",
    stock_quantity: 30,
    selling_price: 210000,
    status: "Published",
    image: "https://picsum.photos/200/300",
  },
  {
    _id: '4',
    name: "Kem chống nắng Anessa Perfect UV",
    category: "Chống nắng",
    brand: "Shiseido",
    stock_quantity: 50,
    selling_price: 480000,
    status: "Unpublished",
    image: "https://picsum.photos/200/300",
  },
  {
    _id: '5',
    name: "Phấn phủ Fit Me Matte + Poreless",
    category: "Trang điểm",
    brand: "Maybelline",
    stock_quantity: 35,
    selling_price: 295000,
    status: "Published",
    image: "https://picsum.photos/200/300",
  },
  {
    _id: '6',
    name: "Serum Vitamin C Melano CC",
    category: "Chăm sóc da",
    brand: "Rohto",
    stock_quantity: 28,
    selling_price: 350000,
    status: "Published",
    image: "https://picsum.photos/200/300",
  },
  {
    _id: '7',
    name: "Toner Simple Kind to Skin",
    category: "Chăm sóc da",
    brand: "Unilever",
    stock_quantity: 32,
    selling_price: 240000,
    status: "Published",
    image: "https://picsum.photos/200/300",
  },
  {
    _id: '8',
    name: "Mặt nạ giấy Mediheal Tea Tree",
    category: "Chăm sóc da",
    brand: "Mediheal",
    stock_quantity: 160,
    selling_price: 28000,
    status: "Published",
    image: "https://picsum.photos/200/300",
  },
  {
    _id: '9',
    name: "Dầu gội Tsubaki Premium Moist",
    category: "Chăm sóc tóc",
    brand: "Shiseido",
    stock_quantity: 22,
    selling_price: 310000,
    status: "Published",
    image: "https://picsum.photos/200/300",
  },
  {
    _id: '10',
    name: "Nước tẩy trang Bioderma Sensibio H2O",
    category: "Tẩy trang",
    brand: "Bioderma",
    stock_quantity: 45,
    selling_price: 420000,
    status: "Published",
    image: "https://picsum.photos/200/300",
  },
];

type ProductKey = "name" | "category" | "brand";

export function getStatusBadge(status: string) {
  if (status === "Published") {
    return <Badge variant="default" className="bg-green-100 text-green-800">Published</Badge>;
  } else {
    return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Unpublished</Badge>;
  }
};

export default function ProductsTable({
  onView,
}: {
  onView: (productId: string) => void;
}) {
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") || 1) || 1;
  const searchQuery = searchParams.get("q") || "";

  const [limit, setLimit] = useState(7);
  const [searchBy, setSearchBy] = useState<ProductKey>("name");
  const [data, setData] = useState<IProduct[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    // Mô phỏng loading trong 500ms rồi render giao diện
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timeout);

  };

  useEffect(() => {
    fetchProducts();
    setData(mockProducts.slice(0, limit)) //sau khi fetch data thật thì xóa dòng này đi
    setTotal(mockProducts.length)
  }, [page, limit, searchQuery, searchBy]);


  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row gap-4">
          <SearchBar placeholder="Search products..." willUpdateQuery />

          <Select value={searchBy} onValueChange={(value: ProductKey) => setSearchBy(value)}>
            <SelectTrigger size="sm" className="w-full sm:w-48">
              <SelectValue placeholder="Search by ..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Product name</SelectItem>
              <SelectItem value="category">Category</SelectItem>
              <SelectItem value="brand">Brand</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>In Stock</TableHead>
              <TableHead className="text-right">Selling Price</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Spinner className="size-10" />
                </TableCell>
              </TableRow>
            ) : data.length > 0 ? (
              data.map((item) => (
                <TableRow key={item._id}>
                  <TableCell className="w-3/14 max-w-80 pr-8" title={item.name}>
                    <div className="flex items-center gap-3">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <span className="flex-1 font-medium truncate">{item.name}</span>
                    </div>
                  </TableCell>

                  <TableCell className="w-2/14 text-muted-foreground">
                    {item.category}
                  </TableCell>

                  <TableCell className="w-2/14 text-muted-foreground">
                    {item.brand}
                  </TableCell>

                  <TableCell className="w-1/14 ">
                    {item.stock_quantity > 0
                      ? <span className="text-muted-foreground">{item.stock_quantity}</span>
                      : <span className="text-muted-foreground/50">Out of stock</span>}
                  </TableCell>

                  <TableCell className="w-2/14 text-right font-medium">
                    {item.selling_price.toLocaleString()} VND
                  </TableCell>

                  <TableCell className="w-2/14 text-center">
                    {getStatusBadge(item.status)}
                  </TableCell>

                  <TableCell className="text-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onView(item._id)}
                    >
                      View Detail
                      <ChevronRight />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  Không có dữ liệu
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <Pagination total={total} page={page} limit={limit} onLimitChange={setLimit} item="product" />

      </CardContent>
    </Card>
  );
}