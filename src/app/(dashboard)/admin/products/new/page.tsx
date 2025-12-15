"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageWithFallback } from "@/components/layout/ImageWithFallback";
import { Image, UploadCloud } from "lucide-react";
import { IAddEditProduct, IFetchedBrand, IFetchedCategory, } from "@/interfaces/product.interface";

const NullProduct: IAddEditProduct = {
  _id: '',
  sku: '',
  name: "",
  category: { _id: "", name: "" },
  brand: { _id: "", name: "" },
  selling_price: 0,
  description: "",
  image: '',
  status: "",
};

const mockCategoryList: IFetchedCategory[] = [
  { _id: '1', name: 'Cleanser', },
  { _id: '2', name: 'Moisturizer', },
  { _id: '3', name: 'Sunscreen', },
  { _id: '4', name: 'Mask', },
];

const mockBrandList: IFetchedBrand[] = [
  { _id: '1', name: 'Innisfree', },
  { _id: '2', name: 'Rohto', },
  { _id: '3', name: 'Shiseido', },
  { _id: '4', name: 'Unilever', },
];

export function generateSKU(category: string, brand: string) {
  // Chuẩn hóa: bỏ dấu, chuyển uppercase
  const normalize = (str: string) =>
    str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9]/g, "")
      .toUpperCase();

  // Lấy 3 chữ cái đầu của category và brand
  const cat = normalize(category).slice(0, 3) || "CAT";
  const brd = normalize(brand).slice(0, 3) || "BRD";

  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, "0");

  const timestamp =
    now.getFullYear().toString().slice(2) +
    pad(now.getMonth() + 1) +
    pad(now.getDate()) +
    pad(now.getHours()) +
    pad(now.getMinutes()) +
    pad(now.getSeconds());

  return `${cat}-${brd}-${timestamp}`;
}

export default function NewProduct() {
  const router = useRouter();
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [data, setData] = useState<IAddEditProduct>(NullProduct);
  const [categoryList, setCategoryList] = useState<IFetchedCategory[]>(mockCategoryList);
  const [brandList, setBrandList] = useState<IFetchedBrand[]>(mockBrandList);

  const handleGenerate = () => {
    if (data.category._id === "" || data.brand._id === "") return;
    setData((prev) => ({ ...prev, sku: generateSKU(data.category.name, data.brand.name) }));
  }

  const handleSaveAndPublish = () => {
    router.push("./")
  }

  return (
    <div className="h-full flex flex-col px-8 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          New Product Item
        </h1>

        <div className="flex items-center gap-4">
          <Button variant="outline">
            Save & Unpublish
          </Button>
          <Button
            onClick={() => handleSaveAndPublish()}
          >
            Save & Publish
          </Button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="col-span-2">
          <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div>
                <Label
                  htmlFor="product-name"
                  className={`transition-all text-muted-foreground
                    ${data.name.trim() === "" ? "opacity-0 h-0 -translate-y-2" : "opacity-100 mb-2"}
                  `}
                >
                  Product Name
                </Label>
                <Textarea
                  id="product-name"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  placeholder="Product Name"
                  className="h-12"
                />
              </div>

              <div>
                <Label
                  htmlFor="product-category"
                  className={`transition-all text-muted-foreground
                    ${data.category._id.trim() === "" ? "opacity-0 h-0 -translate-y-2" : "opacity-100 mb-2"}
                  `}
                >
                  Category
                </Label>
                <Select
                  value={data.category._id}
                  onValueChange={(value) => {
                    const newCategory = categoryList.find(item => item._id === value);
                    if (newCategory) setData({ ...data, category: newCategory });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Product Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryList.map((item) => (
                      <SelectItem key={item._id} value={item._id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label
                  htmlFor="product-brand"
                  className={`transition-all text-muted-foreground
                    ${data.brand._id.trim() === "" ? "opacity-0 h-0 -translate-y-2" : "opacity-100 mb-2"}
                  `}
                >
                  Brand
                </Label>
                <Select
                  value={data.brand._id}
                  onValueChange={(value) => {
                    const newBrand = brandList.find(item => item._id === value);
                    if (newBrand) setData({ ...data, brand: newBrand });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {brandList.map((item) => (
                      <SelectItem key={item._id} value={item._id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label
                  htmlFor="product-sku"
                  className={`transition-all text-muted-foreground
                    ${!data.sku ? "opacity-0 h-0 -translate-y-2" : "opacity-100 mb-2"}
                  `}
                >
                  Product SKU
                </Label>
                <Input
                  id="product-sku"
                  value={data.sku}
                  onChange={(e) => setData({ ...data, sku: e.target.value })}
                  placeholder="Auto-generate Product SKU or Custom"
                  className="h-12"
                />
                <Button
                  className="w-full my-2"
                  onClick={() => handleGenerate()}
                >
                  Generate
                </Button>
                <p className="text-xs text-muted-foreground ml-2">
                  * Select category and brand to generate
                </p>
                <p className="text-xs text-muted-foreground ml-2">
                  * Leave blank to auto-generate on save
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <Label
                  htmlFor="product-description"
                  className={`transition-all text-muted-foreground
                    ${data.description.trim() === "" ? "opacity-0 h-0 -translate-y-2" : "opacity-100 mb-2"}
                  `}
                >
                  Description
                </Label>
                <Textarea
                  id="product-description"
                  value={data.description}
                  onChange={(e) => setData({ ...data, description: e.target.value })}
                  placeholder="Product Description"
                />
              </div>

              <div>
                <Label
                  htmlFor="product-selling-price"
                  className={`transition-all text-muted-foreground
                    ${data.selling_price === 0 ? "opacity-0 h-0 -translate-y-2" : "opacity-100 mb-2"}
                  `}
                >
                  Selling Price
                </Label>
                <Input
                  id="product-selling-price"
                  type="number"
                  onChange={(e) => setData({ ...data, selling_price: Number(e.target.value) })}
                  placeholder="Selling Price"
                  className="h-12"
                />
              </div>
            </div>
          </CardContent>

        </Card>

        <Card>
          <CardContent className="space-y-4">
            {data.image === "" ? (
              <div className="flex flex-col justify-center items-center w-full h-80 bg-input rounded-lg border text-muted-foreground/70">
                <Image className="w-14 h-14 mb-6 text-primary" />
                <div className="flex gap-3 mb-3 font-medium text-primary/80">
                  <UploadCloud />
                  <span>Upload Image</span>
                </div>
                <p className="text-sm mb-1">Upload a cover image for your product.</p>
                <div className="text-xs">
                  <span>File Format</span>
                  <span className="font-semibold"> jpeg, png </span>
                  <span>Recommened Size</span>
                  <span className="font-semibold"> 600x600 (1:1)</span>
                </div>
              </div>
            ) : (
              <ImageWithFallback
                src={data.image}
                alt={data.name}
                className="w-full h-80 rounded-lg border object-contain"
              />
            )}
            <Label className="text-muted-foreground text-md">Product Image Cover</Label>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}