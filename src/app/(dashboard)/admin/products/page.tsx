"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProductsTable from "./ProductsTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function ProductsManagement() {
  const router = useRouter();
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  return (
    <div className="px-8 py-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Products Management
        </h1>
        <Button onClick={() => { router.push("products/new-product"); }}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Product
        </Button>
      </div>

      <ProductsTable
        onViewProduct={(id) => { router.push(`products/${id}`); }}
        onChangeProductStatus={(id, isPublished) => { }}
      />
    </div>
  );
}