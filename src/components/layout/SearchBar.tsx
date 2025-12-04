"use client";

import { useState } from "react";
import { useRouter, useSearchParams, } from "next/navigation";
import { cn, updateQueryParams } from "@/lib/utils";
import { Search } from "lucide-react";
import { Input } from "../ui/input";

interface SearchBarProps {
  searchItem: string;
  className?: string;
}

export default function SearchBar({ searchItem, className }: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(searchParams.get("q") ?? "");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const newQuery = updateQueryParams(searchParams, {
        q: value,
        page: 1, // reset page khi search
      });

      router.push(`?${newQuery}`);
    }
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      <Input
        placeholder={`Search ${searchItem}s...`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className={cn("pl-10 w-96", className)}
      />
    </div>
  );
}