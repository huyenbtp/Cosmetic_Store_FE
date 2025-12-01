"use client"

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Plus } from "lucide-react";
import SearchBar from "@/components/layout/SearchBar";
import UserAccountsFilter from "./UserAccountsFilter";
import UserAccountsTable from "./UserAccountsTable";
import { Pagination } from "@/components/layout/Pagination";
import { IUserAccount } from "@/interfaces/userAccount.interface";

const mockUserAccounts: IUserAccount[] = [
  {
    _id: '1',
    username: "SarahJohnson",
    role: "Admin",
    status: "active",
    createdAt: "1997-06-15T00:00:00",
    updatedAt: "1997-06-15T00:00:00",
  },
  {
    _id: '2',
    username: "MikeChen",
    role: "Admin",
    status: "inactive",
    createdAt: "1997-06-15T00:00:00",
    updatedAt: "1997-06-15T00:00:00",
  },
  {
    _id: '3',
    username: "EmmaWilson",
    role: "Cashier",
    status: "active",
    createdAt: "1997-06-15T00:00:00",
    updatedAt: "1997-06-15T00:00:00",
  },
  {
    _id: '4',
    username: "DavidBrown",
    role: "Cashier",
    status: "inactive",
    createdAt: "1997-06-15T00:00:00",
    updatedAt: "1997-06-15T00:00:00",
  },
  {
    _id: '5',
    username: "LisaGarcia",
    role: "Cashier",
    status: "active",
    createdAt: "1997-06-15T00:00:00",
    updatedAt: "1997-06-15T00:00:00",
  },
  {
    _id: '6',
    username: "JamesTaylor",
    role: "Cashier",
    status: "active",
    createdAt: "1997-06-15T00:00:00",
    updatedAt: "1997-06-15T00:00:00",
  },
  {
    _id: '7',
    username: "MariaRodriguez",
    role: "Cashier",
    status: "active",
    createdAt: "1997-06-15T00:00:00",
    updatedAt: "1997-06-15T00:00:00",
  }
];

export default function UserAccountsManagement() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") || 1) || 1;
  const searchQuery = searchParams.get("q") || "";
  const role = searchParams.get("role") || "";
  const status = searchParams.get("status") || "";

  const [limit, setLimit] = useState(7);
  const [data, setData] = useState<IUserAccount[]>([]);
  const [total, setTotal] = useState(0);

  const fetchUserAccounts = async () => {

  };

  useEffect(() => {
    fetchUserAccounts();
    setData(mockUserAccounts.slice(0, limit)) //sau khi fetch data thật thì xóa dòng này đi
    setTotal(mockUserAccounts.length)
  }, [page, limit, searchQuery, role, status]);

  return (
    <div className="px-8 py-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          User Accounts Management
        </h1>
        <Button
          onClick={() => { router.push("accounts/new")}}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New User Account
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <SearchBar searchItem="user account" />
            <UserAccountsFilter />
          </div>
        </CardHeader>

        <CardContent>
          <Suspense fallback={<Spinner />}>
            <UserAccountsTable
              data={data}
              onView={(id) => { router.push(`user-accounts/${id}`) }}
              onEdit={(id) => { router.push(`user-accounts/${id}/edit`) }}
            />
          </Suspense>

          <Pagination total={total} page={page} limit={limit} onLimitChange={setLimit} item="account" />

        </CardContent>
      </Card>
    </div>
  );
}