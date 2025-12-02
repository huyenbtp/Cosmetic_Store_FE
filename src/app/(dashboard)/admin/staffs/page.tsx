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
import { IStaff } from "@/interfaces/staff.interface";

const mockStaffs: IStaff[] = [
  {
    _id: '1',
    staff_code: "ADM-2025-0001",
    full_name: "Sarah Johnson",
    phone: "0123456789",
    image: "https://picsum.photos/200/300?random=1",
    position: "admin",
    status: "active",
    account: {
      _id: '1',
      username: "SarahJohnson",
      role: "admin",
      status: "active",
    },
  },
  {
    _id: '2',
    staff_code: "ADM-2025-0002",
    full_name: "Mike Chen",
    phone: "0123456789",
    image: "https://picsum.photos/200/300?random=2",
    position: "admin",
    status: "active",
    account: {
      _id: '1',
      username: "MikeChen",
      role: "admin",
      status: "active",
    },
  },
  {
    _id: '3',
    staff_code: "CSH-2025-0003",
    full_name: "Emma Wilson",
    phone: "0123456789",
    image: "https://picsum.photos/200/300?random=3",
    position: "cashier",
    status: "active",
    account: {
      _id: '1',
      username: "EmmaWilson",
      role: "cashier",
      status: "active",
    },
  },
  {
    _id: '4',
    staff_code: "CSH-2025-0004",
    full_name: "David Brown",
    phone: "0123456789",
    image: "https://picsum.photos/200/300?random=4",
    position: "cashier",
    status: "on_leave",
    account: {
      _id: '1',
      username: "DavidBrown",
      role: "cashier",
      status: "active",
    },
  },
  {
    _id: '5',
    staff_code: "CSH-2025-0005",
    full_name: "Lisa Garcia",
    phone: "0123456789",
    image: "https://picsum.photos/200/300?random=5",
    position: "cashier",
    status: "terminated",
    account: {
      _id: '1',
      username: "SarahJohnson",
      role: "cashier",
      status: "inactive",
    },
  },
  {
    _id: '6',
    staff_code: "CSH-2025-0006",
    full_name: "James Taylor",
    phone: "0123456789",
    image: "https://picsum.photos/200/300?random=6",
    position: "cashier",
    status: "active",
    account: {
      _id: '1',
      username: "JamesTaylor",
      role: "cashier",
      status: "active",
    },
  },
  {
    _id: '7',
    staff_code: "CSH-2025-0007",
    full_name: "Maria Rodriguez",
    phone: "0123456789",
    image: "https://picsum.photos/200/300?random=7",
    position: "cashier",
    status: "on_leave",
    account: {
      _id: '1',
      username: "MariaRodriguez",
      role: "cashier",
      status: "active",
    },
  }
];

type StaffKey = "staff_code" | "full_name" | "phone";

export default function StaffsManagement() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") || 1) || 1;
  const searchQuery = searchParams.get("q") || "";
  const empStatus = searchParams.get("empStatus") || "";
  const role = searchParams.get("role") || "";
  const accStatus = searchParams.get("accStatus") || "";

  const [limit, setLimit] = useState(7);
  const [searchBy, setSearchBy] = useState<StaffKey>("staff_code");
  const [data, setData] = useState<IStaff[]>([]);
  const [total, setTotal] = useState(0);

  const fetchStaffs = async () => {

  };

  useEffect(() => {
    fetchStaffs();
    setData(mockStaffs.slice(0, limit)) //sau khi fetch data thật thì xóa dòng này đi
    setTotal(mockStaffs.length)
  }, [page, limit, searchQuery, searchBy, empStatus, role, accStatus]);

  return (
    <div className="px-8 py-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Staffs Management
        </h1>
        <Button
          onClick={() => { router.push("staffs/new") }}
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
                <SelectItem value="staff_code">Staff code</SelectItem>
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
              onEdit={(id) => { router.push(`staffs/${id}/edit`) }}
            />
          </Suspense>

          <Pagination total={total} page={page} limit={limit} onLimitChange={setLimit} item="staff" />

        </CardContent>
      </Card>
    </div>
  );
}