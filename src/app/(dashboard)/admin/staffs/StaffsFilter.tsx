import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { updateQueryParams } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function getStaffStatusBadge(status: string) {
  if (status === "active") {
    return <Badge className="bg-success1 text-success1-foreground">Active</Badge>
  } else if (status === "on_leave") {
    return <Badge className="bg-warning1 text-warning1-foreground">On leave</Badge>
  } else if (status === "terminated") {
    return <Badge className="bg-error1 text-error1-foreground">Terminated</Badge>
  }
};

export default function StaffsFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const gender = searchParams.get("gender") || "";
  const position = searchParams.get("position") || "";
  const status = searchParams.get("status") || "";

  const handleGenderChange = (value: string) => {
    const newQuery = updateQueryParams(searchParams, {
      gender: value !== "all" ? value : "",
      page: 1,
    });
    router.push(`?${newQuery}`);
  }

  const handlePositionChange = (value: string) => {
    const newQuery = updateQueryParams(searchParams, {
      position: value !== "all" ? value : "",
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
      <Select value={gender} onValueChange={(value) => handleGenderChange(value)}>
        <SelectTrigger size="sm" className="w-full sm:w-36">
          <SelectValue placeholder="Gender" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All gender</SelectItem>
          <SelectItem value="Male">Male</SelectItem>
          <SelectItem value="Female">Female</SelectItem>
        </SelectContent>
      </Select>

      <Select value={position} onValueChange={(value) => handlePositionChange(value)}>
        <SelectTrigger size="sm" className="w-full sm:w-36">
          <SelectValue placeholder="Position" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All position</SelectItem>
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
          {["active", "on_leave", "terminated"].map(value => (
            <SelectItem value={value}>{getStaffStatusBadge(value)}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}