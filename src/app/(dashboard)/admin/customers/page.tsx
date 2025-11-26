"use client"

import { useRouter } from "next/navigation";
import CustomersTable from "./CustomersTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function CustomersManagement() {
  const router = useRouter();

  return (
    <div className="px-8 py-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Customers Management
        </h1>
        <Button onClick={() => { router.push("customers/new-customer"); }}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Customer
        </Button>
      </div>

      <CustomersTable
        onView={(id) => { router.push(`customers/${id}`) }}
        onEdit={() => { }}
        onDelete={() => { }}
      />
    </div>
  );
}