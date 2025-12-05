import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { updateQueryParams } from "@/lib/utils";
import { DateRangePicker } from "@/components/layout/DateRangePicker";
import { DateRange } from "react-day-picker";
import ValueRangePicker from "@/components/layout/ValueRangePicker";

export default function ImportsFilter({ maxAmount }: { maxAmount: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: searchParams.get("fromDate") ? new Date(searchParams.get("fromDate") as string) : undefined,
    to: searchParams.get("toDate") ? new Date(searchParams.get("toDate") as string) : undefined,
  });
  const [totalAmountRange, setTotalAmountRange] = useState<number[]>([0, 0]);

  useEffect(() => {
    setTotalAmountRange([
      searchParams.get("minAmount") ? Number(searchParams.get("minAmount")) : 0,
      searchParams.get("maxAmount") ? Number(searchParams.get("maxAmount")) : maxAmount
    ])
  }, [maxAmount]);

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);

    const from = range?.from?.toISOString();
    const to = range?.to?.toISOString();

    const newQuery = updateQueryParams(searchParams, {
      fromDate: from || "",
      toDate: to || "",
      page: 1,
    });

    router.push(`?${newQuery}`);
  };

  const handleTotalAmountChange = (range: number[]) => {
    setTotalAmountRange(range);

    const min = range[0];
    const max = range[1];

    const newQuery = updateQueryParams(searchParams, {
      minAmount: min,
      maxAmount: max,
    });

    router.push(`?${newQuery}`);
  }

  return (
    <>
      <DateRangePicker
        initialDateRange={dateRange}
        onChange={handleDateRangeChange}
        disabledDays={{ after: new Date() }}
      />

      <ValueRangePicker
        placeholder="Total Amount"
        label="Total Amount Range"
        unit="đ"
        max={maxAmount}
        step={1_000_000}
        value={totalAmountRange}
        handleApply={handleTotalAmountChange}
      />
    </>
  );
}