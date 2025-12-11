"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";
import { IDiscountCode } from "@/interfaces/order.interface";
import { cn } from "@/lib/utils";

const mockDiscountCodes: IDiscountCode[] = [
  {
    _id: "1",
    code: "SUMMER2025",
    description: "Hello tet 2025",
    type: "percent",
    value: 10,
    start_date: "2025-06-01T00:00:00",
    end_date: "2025-06-30T23:59:59",
    min_order_value: 0,
    max_uses: 100,
    used_count: 10,
    is_active: true,
  },
  {
    _id: "2",
    code: "TET2025",
    description: "Hello tet 2025",
    type: "amount",
    value: 50000,
    start_date: "2025-01-01T00:00:00",
    end_date: "2025-02-28T23:59:59",
    min_order_value: 500000,
    max_uses: 100,
    used_count: 22,
    is_active: true,
  },
  {
    _id: "3",
    code: "BACKTOSCHOOL2025",
    description: "Hello tet 2025",
    type: "percent",
    value: 20,
    start_date: "2025-08-01T00:00:00",
    end_date: "2025-12-31T23:59:59",
    min_order_value: 300000,
    max_uses: 100,
    used_count: 35,
    is_active: true,
  },
  {
    _id: "4",
    code: "THANG12RANGRO",
    description: "Hello tet 2025",
    type: "percent",
    value: 10,
    start_date: "2025-12-01T00:00:00",
    end_date: "2025-12-31T23:59:59",
    min_order_value: 300000,
    max_uses: 100,
    used_count: 10,
    is_active: true,
  },
  {
    _id: "5",
    code: "CHAONAMMOI",
    description: "Hello tet 2025",
    type: "amount",
    value: 100000,
    start_date: "2025-12-25T00:00:00",
    end_date: "2025-01-10T23:59:59",
    min_order_value: 1000000,
    max_uses: 100,
    used_count: 10,
    is_active: true,
  },
]

interface DiscountCodePickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subtotal: number;
  selectedCodeId: string | null;
  onSelect: (code: IDiscountCode | null) => void;
}

export default function DiscountCodePickerDialog({
  open,
  onOpenChange,
  subtotal,
  selectedCodeId,
  onSelect,
}: DiscountCodePickerProps) {
  const [search, setSearch] = useState("");
  const [codesList, setCodesList] = useState<IDiscountCode[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Fetch API
  const fetchCodes = async (query: string, pageNum: number) => {
    setLoading(true);
    try {
      const res = mockDiscountCodes

      if (pageNum === 1) setCodesList(res);
      else setCodesList((prev) => [...prev, ...res]);

      setHasMore(res.length === 20);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  // Infinite scroll
  useEffect(() => {
    if (!containerRef.current) return;

    const el = containerRef.current;

    const handleScroll = () => {
      if (!hasMore || loading) return;
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 20) {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchCodes(search, nextPage);
      }
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [page, hasMore, loading, search]);

  // Check usable
  const isAvailable = (code: IDiscountCode) => {
    const now = new Date().toISOString();
    return (
      code.is_active &&
      code.start_date <= now &&
      code.end_date >= now &&
      code.min_order_value <= subtotal &&
      code.used_count < code.max_uses
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Select Discount Code</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Input
            placeholder="Enter discount code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setPage(1);
                fetchCodes(search, 1);
              }
            }}
          />

          {/* List */}
          <ScrollArea className="h-80 border rounded-md" ref={containerRef}>
            <div className="p-2 space-y-2">
              {codesList.length === 0 && !loading && (
                <p className="text-center text-sm text-muted-foreground pt-10">
                  Enter code to search
                </p>
              )}

              {codesList.map((item) => {
                const available = isAvailable(item);

                return (
                  <button
                    key={item._id}
                    disabled={!available}
                    onClick={() => {
                      if (selectedCodeId === item._id) onSelect(null);
                      else if (available) onSelect(item);
                    }}
                    className={cn("w-full text-left border rounded-md p-3 transition",
                      available ? "hover:bg-accent cursor-pointer" : "opacity-50 cursor-not-allowed",
                      item._id === selectedCodeId ? "border-primary bg-accent/80" : ""
                    )}
                  >
                    <div className="font-semibold">{item.code}</div>
                    <div className="text-sm text-muted-foreground">
                      {item.description}
                    </div>
                    <div className="text-sm mt-1">
                      {item.type === "percent"
                        ? `Discount ${item.value}%`
                        : `Discount ${item.value.toLocaleString()}₫`}
                    </div>
                  </button>
                );
              })}

              {loading && (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="w-5 h-5 animate-spin" />
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="flex justify-end">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}