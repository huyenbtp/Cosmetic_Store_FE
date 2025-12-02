"use client"

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import StaffForm from "../../StaffForm";
import { IAddEditStaff } from "@/interfaces/staff.interface";

const mockStaff: IAddEditStaff = {
  _id: '1',
  full_name: "Sarah Johnson",
  gender: "female",
  dob: "1998-02-25T00:00:00",
  phone: "0123456789",
  image: "https://picsum.photos/200/300",
  position: "cashier",
  status: "active",
  account: {
    _id: "1",
    username: "SarahJohnson",
    role: "cashier",
    status: "active",
  },
};

export default function EditStaff() {
  const router = useRouter();
  const { id } = useParams();
  const [data, setData] = useState<IAddEditStaff>(mockStaff);

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