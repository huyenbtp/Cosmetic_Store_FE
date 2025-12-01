import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { updateQueryParams } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function getUserAccountStatusBadge(status: string) {
  if (status === "active") {
    return <Badge className="bg-success1 text-success1-foreground">Active</Badge>
  } else if (status === "inactive") {
    return <Badge className="bg-warning1 text-warning1-foreground">In Active</Badge>
  }
};

export default function UserAccountsFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const role = searchParams.get("role") || "";
  const status = searchParams.get("status") || "";

  const handleRoleChange = (value: string) => {
    const newQuery = updateQueryParams(searchParams, {
      role: value !== "all" ? value : "",
      page: 1,
    });
    router.push(`?${newQuery}`);
  }

  const handleStatusChange = (value: string) => {
    const newQuery = updateQueryParams(searchParams, {
      status: value !== "all" ? value : "",
      page: 1,
    });
    router.push(`?${newQuery}`);
  }

  return (
    <>
      <Select value={role} onValueChange={(value) => handleRoleChange(value)}>
        <SelectTrigger size="sm" className="w-full sm:w-36">
          <SelectValue placeholder="Role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All role</SelectItem>
          <SelectItem value="Admin">Admin</SelectItem>
          <SelectItem value="Cashier">Cashier</SelectItem>
        </SelectContent>
      </Select>

      <Select value={status} onValueChange={(value) => handleStatusChange(value)}>
        <SelectTrigger size="sm" className="w-full sm:w-36">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All status</SelectItem>
          {["active", "inactive"].map(value => (
            <SelectItem key={value} value={value}>{getUserAccountStatusBadge(value)}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}