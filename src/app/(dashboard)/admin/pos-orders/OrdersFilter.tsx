import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { updateQueryParams } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { DateRangePicker } from "@/components/layout/DateRangePicker";
import { DateRange } from "react-day-picker";

export function getOrderStatusBadge(status: string) {
  if (status === "paid") {
    return <Badge className="bg-success1 text-success1-foreground">Paid</Badge>
  } else if (status === "unpaid") {
    return <Badge className="bg-error1 text-error1-foreground">Unpaid</Badge>
  }
};

export default function OrdersFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const dateRange = {
    from: searchParams.get("date_from") ? new Date(searchParams.get("date_from") as string) : undefined,
    to: searchParams.get("date_to") ? new Date(searchParams.get("date_to") as string) : undefined,
  };
  const payment_method = searchParams.get("pmMtd") || "";
  const status = searchParams.get("status") || "";

  const handleDateRangeChange = (r: DateRange | undefined) => {
    if (!r?.from || !r?.to) return;

    const newQuery = updateQueryParams(searchParams, {
      date_from: r.from.toISOString(),
      date_to: r.to.toISOString(),
      page: 1,
    });

    router.push(`?${newQuery}`);
  };

  const handlePaymentMethodChange = (value: string) => {
    const newQuery = updateQueryParams(searchParams, {
      pmMtd: value !== "all" ? value : "",
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
      <DateRangePicker
        initialDateRange={dateRange}
        onChange={handleDateRangeChange} 
      />

      <Select value={payment_method} onValueChange={(value) => handlePaymentMethodChange(value)}>
        <SelectTrigger size="sm" className="w-full sm:w-42">
          <SelectValue placeholder="Payment Method" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All payment method</SelectItem>
          <SelectItem value="cash">Cash</SelectItem>
          <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
        </SelectContent>
      </Select>

      <Select value={status} onValueChange={(value) => handleStatusChange(value)}>
        <SelectTrigger size="sm" className="w-full sm:w-30">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All status</SelectItem>
          {["paid", "unpaid"].map(value => (
            <SelectItem key={value} value={value}>{getOrderStatusBadge(value)}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}