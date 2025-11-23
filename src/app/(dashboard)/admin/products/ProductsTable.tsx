"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "@/components/layout/ImageWithFallback";

const mockProducts = [
  {
    id: '1',
    name: "Son môi lì Red Velvet",
    category: "Trang điểm",
    brand: "3CE",
    stock_quantity: 0,
    selling_price: 320000,
    status: "Unpublished",
    image: "https://picsum.photos/200/300",
  },
  {
    id: '2',
    name: "Kem dưỡng ẩm Hada Labo",
    category: "Chăm sóc da",
    brand: "Rohto",
    stock_quantity: 40,
    selling_price: 265000,
    status: "Published",
    image: "https://picsum.photos/200/300",
  },
  {
    id: '3',
    name: "Sữa rửa mặt Innisfree Green Tea",
    category: "Chăm sóc da",
    brand: "Innisfree",
    stock_quantity: 30,
    selling_price: 210000,
    status: "Published",
    image: "https://picsum.photos/200/300",
  },
  {
    id: '4',
    name: "Kem chống nắng Anessa Perfect UV",
    category: "Chống nắng",
    brand: "Shiseido",
    stock_quantity: 50,
    selling_price: 480000,
    status: "Unpublished",
    image: "https://picsum.photos/200/300",
  },
  {
    id: '5',
    name: "Phấn phủ Fit Me Matte + Poreless",
    category: "Trang điểm",
    brand: "Maybelline",
    stock_quantity: 35,
    selling_price: 295000,
    status: "Published",
    image: "https://picsum.photos/200/300",
  },
  {
    id: '6',
    name: "Serum Vitamin C Melano CC",
    category: "Chăm sóc da",
    brand: "Rohto",
    stock_quantity: 28,
    selling_price: 350000,
    status: "Published",
    image: "https://picsum.photos/200/300",
  },
  {
    id: '7',
    name: "Toner Simple Kind to Skin",
    category: "Chăm sóc da",
    brand: "Unilever",
    stock_quantity: 32,
    selling_price: 240000,
    status: "Published",
    image: "https://picsum.photos/200/300",
  },
  {
    id: '8',
    name: "Mặt nạ giấy Mediheal Tea Tree",
    category: "Chăm sóc da",
    brand: "Mediheal",
    stock_quantity: 160,
    selling_price: 28000,
    status: "Published",
    image: "https://picsum.photos/200/300",
  },
  {
    id: '9',
    name: "Dầu gội Tsubaki Premium Moist",
    category: "Chăm sóc tóc",
    brand: "Shiseido",
    stock_quantity: 22,
    selling_price: 310000,
    status: "Published",
    image: "https://picsum.photos/200/300",
  },
  {
    id: '10',
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
  onViewProduct,
  onChangeProductStatus
}: {
  onViewProduct: (productId: string) => void;
  onChangeProductStatus: (productId: string, isPublished: boolean) => void;
}) {
  const [products, setProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState<ProductKey>("name");

  const filteredProducts = products.filter(product => {
    let matchesSearch = true;
    if (searchTerm) {
      const value = product[searchBy];
      matchesSearch = value?.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return matchesSearch;
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

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
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="w-3/14 max-w-80 pr-8" title={product.name}>
                  <div className="flex items-center gap-3">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <span className="flex-1 font-medium truncate">{product.name}</span>
                  </div>
                </TableCell>

                <TableCell className="w-2/14 text-muted-foreground">
                  {product.category}
                </TableCell>

                <TableCell className="w-2/14 text-muted-foreground">
                  {product.brand}
                </TableCell>

                <TableCell className="w-1/14 ">
                  {product.stock_quantity > 0
                    ? <span className="text-muted-foreground">{product.stock_quantity}</span>
                    : <span className="text-muted-foreground/50">Out of stock</span>}
                </TableCell>

                <TableCell className="w-2/14 text-right font-medium">
                  {product.selling_price.toLocaleString()} VND
                </TableCell>

                <TableCell className="w-2/14 text-center">
                  {getStatusBadge(product.status)}
                </TableCell>

                <TableCell className="text-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewProduct(product.id)}
                  >
                    View Detail
                    <ChevronRight />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-muted-foreground">
            Showing {filteredProducts.length} of {products.length} products
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" className="bg-[#576D64] text-white border-[#576D64]">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}