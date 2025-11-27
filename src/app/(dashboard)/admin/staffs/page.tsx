"use client"

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Plus } from "lucide-react";
import SearchBar from "@/components/layout/SearchBar";
import StaffsFilter from "./StaffsFilter";
import StaffsTable from "./StaffsTable";
import { Pagination } from "@/components/layout/Pagination";
//import AddEditStaffDialog from "./AddEditStaffDialog";
import { IAddEditStaff, IStaff } from "@/interfaces/staff.interface";

const mockStaffs: IStaff[] = [
  {
    _id: '1',
    full_name: "Sarah Johnson",
    gender: "Female",
    dob: "1998-02-25T00:00:00",
    phone: "0123456789",
    position: "Admin",
    status: "active",
    account_id: "1",
  },
  {
    _id: '2',
    full_name: "Mike Chen",
    gender: "Male",
    dob: "1997-06-15T00:00:00",
    phone: "0123456789",
    position: "Admin",
    status: "active",
    account_id: "2",
  },
  {
    _id: '3',
    full_name: "Emma Wilson",
    gender: "Female",
    dob: "1999-08-21T00:00:00",
    phone: "0123456789",
    position: "Cashier",
    status: "active",
    account_id: "3",
  },
  {
    _id: '4',
    full_name: "David Brown",
    gender: "Male",
    dob: "1996-09-24T00:00:00",
    phone: "0123456789",
    position: "Cashier",
    status: "on_leave",
    account_id: "4",
  },
  {
    _id: '5',
    full_name: "Lisa Garcia",
    gender: "Female",
    dob: "1995-11-22T00:00:00",
    phone: "0123456789",
    position: "Cashier",
    status: "terminated",
    account_id: "5",
  },
  {
    _id: '6',
    full_name: "James Taylor",
    gender: "Male",
    dob: "1995-06-11T00:00:00",
    phone: "0123456789",
    position: "Cashier",
    status: "active",
    account_id: "6",
  },
  {
    _id: '7',
    full_name: "Maria Rodriguez",
    gender: "Female",
    dob: "1998-04-05T00:00:00",
    phone: "0123456789",
    position: "Cashier",
    status: "on_leave",
    account_id: "7",
  }
];

type StaffKey = "full_name" | "phone";

export default function StaffsManagement() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") || 1) || 1;
  const searchQuery = searchParams.get("q") || "";
  const gender = searchParams.get("gender") || "";
  const position = searchParams.get("position") || "";
  const status = searchParams.get("status") || "";

  const [limit, setLimit] = useState(7);
  const [searchBy, setSearchBy] = useState<StaffKey>("full_name");
  const [data, setData] = useState<IStaff[]>([]);
  const [total, setTotal] = useState(0);
  const [selectedItem, setSelectedItem] = useState<IAddEditStaff | null>(null);
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);

  const fetchStaffs = async () => {

  };

  useEffect(() => {
    fetchStaffs();
    setData(mockStaffs.slice(0, limit)) //sau khi fetch data thật thì xóa dòng này đi
    setTotal(mockStaffs.length)
  }, [page, limit, searchQuery, searchBy, gender, position, status]);

  return (
    <div className="px-8 py-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Staffs Management
        </h1>
        <Button
          onClick={() => {
            setSelectedItem(null)
            setIsAddEditDialogOpen(true)
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Staff
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <SearchBar searchItem="staff" />

            <Select value={searchBy} onValueChange={(value: StaffKey) => setSearchBy(value)}>
              <SelectTrigger size="sm" className="w-full sm:w-48">
                <SelectValue placeholder="Search by ..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full_name">Staff name</SelectItem>
                <SelectItem value="phone">Phone number</SelectItem>
              </SelectContent>
            </Select>

            <StaffsFilter />
          </div>
        </CardHeader>

        <CardContent>
          <Suspense fallback={<Spinner />}>
            <StaffsTable
              data={data}
              onView={(id) => { router.push(`staffs/${id}`) }}
              onEdit={(selected) => {
                setSelectedItem(selected)
                setIsAddEditDialogOpen(true)
              }}
            />
          </Suspense>

          <Pagination total={total} page={page} limit={limit} onLimitChange={setLimit} item="staff" />

        </CardContent>
      </Card>
    </div>
  );
}