
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ValueRangePicker from "@/components/layout/ValueRangePicker";
import { useRouter, useSearchParams } from "next/navigation";
import { updateQueryParams } from "@/lib/utils";
import { IMinMaxFilterData } from "@/interfaces/product.interface";
import { ProductKey, ProductStatus } from "@/lib/api/product.api";

export function getProductStatusBadge(status: string) {
  if (status === "published") {
    return <Badge className="bg-success1 text-success1-foreground">Published</Badge>
  } else if (status === "unpublished") {
    return <Badge className="bg-warning1 text-warning1-foreground">Unpublished</Badge>
  } else {
    return <Badge variant="secondary">{status}</Badge>
  }
};

export default function ProductsFilter({
  data,
  priceRange,
  stockRange,
  handleApplyPrice,
  handleApplyStock,
}: {
  data: IMinMaxFilterData;
  priceRange: number[];
  stockRange: number[];
  handleApplyPrice: (range: number[]) => void;
  handleApplyStock: (range: number[]) => void;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchBy = searchParams.get("by") || "name";
  const status = searchParams.get("status") || "";

  const handleSearchByChange = (value: ProductKey) => {
    const newQuery = updateQueryParams(searchParams, {
      by: value,
      page: 1,
    });
    router.push(`?${newQuery}`);
  }

  const handleStatusChange = (value: ProductStatus | "all") => {
    const newQuery = updateQueryParams(searchParams, {
      status: value !== "all" ? value : "",
      page: 1,
    });
    router.push(`?${newQuery}`);
  }

  return (
    <>
      <Select value={searchBy} onValueChange={(value: ProductKey) => handleSearchByChange(value)}>
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

      <ValueRangePicker
        placeholder="Stock Quantity"
        label="Stock Quantity Range"
        unit=""
        min={data.stock.min}
        max={data.stock.max}
        step={1}
        value={stockRange}
        handleApply={handleApplyStock}
      />

      <ValueRangePicker
        placeholder="Selling Price"
        label="Selling Price Range"
        unit="₫"
        min={data.price.min}
        max={data.price.max}
        step={1_000}
        value={priceRange}
        handleApply={handleApplyPrice}
      />

      <Select value={status} onValueChange={(value: ProductStatus | "all") => handleStatusChange(value)}>
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