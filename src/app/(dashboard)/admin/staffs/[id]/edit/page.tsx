"use client"

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import StaffForm from "../../StaffForm";
import { IAddEditStaff, IStaff } from "@/interfaces/staff.interface";

const mockStaff: IStaff = {
  _id: '1',
  full_name: "Sarah Johnson",
  gender: "Female",
  dob: "1998-02-25T00:00:00",
  phone: "0123456789",
  image: "https://picsum.photos/200/300",
  position: "Cashier",
  status: "active",
  account_id: "1",
};

export default function EditStaff() {
  const router = useRouter();
    const { id } = useParams();
    const [data, setData] = useState<IStaff>(mockStaff);

  const handleSave = async (data: IAddEditStaff) => {
    router.replace("./")
  }

  return (
    <StaffForm
      mode="edit"
      initialData={data}
      onSubmit={(data) => handleSave(data)}
    />
  );
}