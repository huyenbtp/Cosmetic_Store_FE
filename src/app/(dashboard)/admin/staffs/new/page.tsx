"use client"

import { useRouter } from "next/navigation";
import StaffForm from "../StaffForm";
import { IAddEditStaff } from "@/interfaces/staff.interface";

export default function NewStaff() {
  const router = useRouter();

  const handleSave = async (data: IAddEditStaff) => {
    const id = 1;   //replace bằng id của item mới tạo
    router.replace(`./${id}`)
  }

  return (
    <StaffForm
      mode="create"
      onSubmit={(data) => handleSave(data)}
    />
  );
}