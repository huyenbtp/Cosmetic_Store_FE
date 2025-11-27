import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Edit, } from "lucide-react";
import { IStaff, IAddEditStaff } from "@/interfaces/staff.interface";
import dayjs from "dayjs";

export function getStatusStyle(status: string) {
  if (status === "active") {
    return "bg-success1 text-success1-foreground"
  } else if (status === "on_leave") {
    return "bg-warning1 text-warning1-foreground"
  } else if (status === "terminated") {
    return "bg-error1 text-error1-foreground"
  }
};

export default function StaffsTable({
  data,
  onView,
  onEdit,
}: {
  data: IStaff[];
  onView: (id: string) => void;
  onEdit: (data: IAddEditStaff) => void;
}) {

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Staff</TableHead>
          <TableHead>Gender</TableHead>
          <TableHead>Dob</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Position</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.length > 0 ? (data.map((staff) => (
          <TableRow key={staff._id}>
            <TableCell className="w-2/8 max-w-80 pr-8" title={staff.full_name}>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage alt={staff.full_name} />
                  <AvatarFallback className="bg-primary text-white">
                    {staff.full_name[0]}
                  </AvatarFallback>
                </Avatar>
                <span className="flex-1 font-medium truncate">{staff.full_name}</span>
              </div>
            </TableCell>

            <TableCell className="w-1/8 text-muted-foreground">
              {staff.gender}
            </TableCell>
            <TableCell className="w-1/8 text-muted-foreground">
              {dayjs(staff.dob).format("DD/MM/YYYY")}
            </TableCell>
            <TableCell className="w-1/8 font-medium">
              {staff.phone}
            </TableCell>

            <TableCell className="w-1/8 font-medium">
              <Select
                defaultValue={staff.position}
                value={staff.position}
                onValueChange={() => { }}
              >
                <SelectTrigger size="xs" className="w-fit bg-secondary text-primary text-xs shadow-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Cashier">Cashier</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>

            <TableCell className="w-1/8 font-medium">
              <Select
                defaultValue={staff.status}
                value={staff.status}
                onValueChange={() => { }}
              >
                <SelectTrigger size="xs" className={`w-fit text-xs shadow-none ${getStatusStyle(staff.status)}`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active" >Active</SelectItem>
                  <SelectItem value="on_leave">On leave</SelectItem>
                  <SelectItem value="terminated">Terminated</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>

            <TableCell className="text-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => { onView(staff._id) }}
              >
                <Eye className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => { onEdit(staff) }}
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