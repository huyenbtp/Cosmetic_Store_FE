"use client"

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function BrandsManagement() {
  const router = useRouter();

  return (
    <div className="px-8 py-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Brands Management
        </h1>
        <Button onClick={() => {  }}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Brand
        </Button>
      </div>


    </div>
  );
}