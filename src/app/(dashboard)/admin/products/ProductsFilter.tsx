import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ValueRangePicker from "@/components/layout/ValueRangePicker";
import { useRouter, useSearchParams } from "next/navigation";
import { updateQueryParams } from "@/lib/utils";
import { IMinMaxFilterData } from "@/interfaces/product.interface";

export function getProductStatusBadge(status: string) {
  if (status === "published") {
    return <Badge className="bg-success1 text-success1-foreground">Published</Badge>
  } else if (status === "unpublished") {
    return <Badge className="bg-warning1 text-warning1-foreground">Unpublished</Badge>
  } else {
    return <Badge variant="secondary">{status}</Badge>
  }
};

export default function ProductsFilter({ data }: { data: IMinMaxFilterData }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [stockQuantityRange, setStockQuantityRange] = useState<number[]>([0, 0]);
  const [sellingPriceRange, setSellingPriceRange] = useState<number[]>([0, 0]);
  const status = searchParams.get("status") || "";

  useEffect(() => {
    setStockQuantityRange([
      searchParams.get("minStock") ? Number(searchParams.get("minStock")) : data.stock.min,
      searchParams.get("maxStock") ? Number(searchParams.get("maxStock")) : data.stock.max
    ])
    setSellingPriceRange([
      searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : data.price.min,
      searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : data.price.max
    ])
  }, [data]);

  const handleStockQuantityChange = (range: number[]) => {
    setStockQuantityRange(range);

    const min = range[0];
    const max = range[1];

    const newQuery = updateQueryParams(searchParams, {
      minStock: min,
      maxStock: max,
      page: 1,
    });

    router.push(`?${newQuery}`);
  }

  const handleSellingPriceChange = (range: number[]) => {
    setSellingPriceRange(range);

    const min = range[0];
    const max = range[1];

    const newQuery = updateQueryParams(searchParams, {
      minPrice: min,
      maxPrice: max,
      page: 1,
    });

    router.push(`?${newQuery}`);
  }

  const handleStatusChange = (value: string) => {
    const newQuery = updateQueryParams(searchParams, {
      status: value !== "all" ? value : "",
      page: 1,
    });
    router.push(`?${newQuery}`);
  }

  return (
    <>
      <ValueRangePicker
        placeholder="Stock Quantity"
        label="Stock Quantity Range"
        unit=""
        min={data.stock.min}
        max={data.stock.max}
        step={1}
        value={stockQuantityRange}
        handleApply={handleStockQuantityChange}
      />

      <ValueRangePicker
        placeholder="Selling Price"
        label="Selling Price Range"
        unit="₫"
        min={data.price.min}
        max={data.price.max}
        step={1_000}
        value={sellingPriceRange}
        handleApply={handleSellingPriceChange}
      />

      <Select value={status} onValueChange={(value) => handleStatusChange(value)}>
        <SelectTrigger size="sm" className="w-full sm:w-30">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All status</SelectItem>
          {["published", "unpublished"].map(value => (
            <SelectItem key={value} value={value}>{getProductStatusBadge(value)}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}