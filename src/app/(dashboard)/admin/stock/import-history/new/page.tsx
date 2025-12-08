"use client"

import { useRouter } from "next/navigation";
import ImportOrderForm from "./ImportOrderForm";
import { IAddEditImport } from "@/interfaces/import.interface";

export default function NewImport() {
  const router = useRouter();

  const handleSave = async (data: IAddEditImport) => {
    const id = 1;   //replace bằng id của item mới tạo
    router.replace(`./${id}`)
  }

  return (
    <ImportOrderForm
      mode="create"
      onSubmit={(data) => handleSave(data)}
    />
  );
}