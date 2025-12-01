import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Edit, } from "lucide-react";
import { IUserAccount } from "@/interfaces/userAccount.interface";
import dayjs from "dayjs";

export function getStatusStyle(status: string) {
  if (status === "active") {
    return "bg-success1 text-success1-foreground"
  } else if (status === "inactive") {
    return "bg-warning1 text-warning1-foreground"
  }
};

export default function UserAccountsTable({
  data,
  onView,
  onEdit,
}: {
  data: IUserAccount[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
}) {

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Username</TableHead>
          <TableHead className="text-center">Created at</TableHead>
          <TableHead className="text-center">Role</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.length > 0 ? (data.map((userAccount) => (
          <TableRow key={userAccount._id}>
            <TableCell className="w-1/5 text-muted-foreground text-center">
              {userAccount.username}
            </TableCell>
            <TableCell className="w-1/5 text-muted-foreground text-center">
              {dayjs(userAccount.createdAt).format("DD/MM/YYYY")}
            </TableCell>

            <TableCell className="w-1/5 font-medium text-center">
              <Select
                defaultValue={userAccount.role}
                value={userAccount.role}
                onValueChange={() => { }}
              >
                <SelectTrigger size="xs" className="inline-flex w-fit bg-secondary text-primary text-xs shadow-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Cashier">Cashier</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>

            <TableCell className="w-1/5 font-medium text-center">
              <Select
                defaultValue={userAccount.status}
                value={userAccount.status}
                onValueChange={() => { }}
              >
                <SelectTrigger size="xs" className={`inline-flex w-fit text-xs shadow-none ${getStatusStyle(userAccount.status)}`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active" >Active</SelectItem>
                  <SelectItem value="inactive">In Active</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>

            <TableCell className="text-center">
              <Button
                variant="ghost"
                size="sm"
                title="View Detail"
                onClick={() => { onView(userAccount._id) }}
              >
                <Eye className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                title="Edit User Account"
                onClick={() => { onEdit(userAccount._id) }}
              >
                <Edit className="w-4 h-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))) : (
          <TableRow>
            <TableCell colSpan={7} align="center">
              Không có dữ liệu
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}