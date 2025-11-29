import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageWithFallback } from "@/components/layout/ImageWithFallback";
import { Image, Save, UploadCloud } from "lucide-react";
import { getStaffStatusBadge } from "./StaffsFilter";
import dayjs from "dayjs";
import { IAddEditStaff, IStaff } from "@/interfaces/staff.interface";
import ImageUploader from "@/components/layout/ImageUploader";

const NullStaff: IAddEditStaff = {
  full_name: "",
  gender: "",
  dob: "",
  phone: "",
  image: "",
  position: "",
  status: "",
  account_id: "",
};

interface StaffFormProps {
  mode: "create" | "edit";
  initialData?: IStaff;
  onSubmit: (data: IAddEditStaff) => void;
}

export default function StaffForm({ mode, initialData, onSubmit }: StaffFormProps) {
  const [data, setData] = useState(initialData ?? NullStaff);

  return (
    <div className="h-full flex flex-col px-8 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          {mode === "create" ? "New Staff" : "Edit Staff"}
        </h1>

        <Button
          onClick={() => onSubmit(data)}
        >
          <Save className="w-4 h-4 mr-2" />
          {mode === "create" ? "Add New Staff" : "Save Changes"}
        </Button>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="col-span-2">
          <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div>
                <Label
                  htmlFor="staff-name"
                  className={`transition-all text-muted-foreground
                    ${data.full_name.trim() === "" ? "opacity-0 h-0 -translate-y-2" : "opacity-100 mb-2"}
                  `}
                >
                  Staff Full Name
                </Label>
                <Input
                  id="staff-name"
                  value={data.full_name}
                  onChange={(e) => setData({ ...data, full_name: e.target.value })}
                  placeholder="Staff Full Name"
                  className="h-12"
                />
              </div>

              <div>
                <Label
                  htmlFor="staff-gender"
                  className={`transition-all text-muted-foreground
                    ${data.gender.trim() === "" ? "opacity-0 h-0 -translate-y-2" : "opacity-100 mb-2"}
                  `}
                >
                  Gender
                </Label>
                <Select
                  value={data.gender}
                  onValueChange={(value) => setData({ ...data, gender: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label
                  htmlFor="staff-dob"
                  className={`transition-all text-muted-foreground opacity-100 mb-2
                  `}
                >
                  Date of Birth
                </Label>
                <Input
                  id="staff-dob"
                  type="date"
                  value={dayjs(data.dob).format("YYYY-MM-DD")}
                  onChange={(e) => { console.log(e.target.value); setData({ ...data, dob: e.target.value }) }}
                  placeholder="Date of Birth"
                  className="h-12"
                />
              </div>

              <div>
                <Label
                  htmlFor="staff-phone"
                  className={`transition-all text-muted-foreground
                    ${data.phone.trim() === "" ? "opacity-0 h-0 -translate-y-2" : "opacity-100 mb-2"}
                  `}
                >
                  Staff Phone Number
                </Label>
                <Input
                  id="staff-phone"
                  type="tel"
                  value={data.phone}
                  onChange={(e) => setData({ ...data, phone: e.target.value })}
                  placeholder="Staff Phone Number"
                  className="h-12"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <Label
                  htmlFor="staff-status"
                  className={`transition-all text-muted-foreground
                    ${data.status.trim() === "" ? "opacity-0 h-0 -translate-y-2" : "opacity-100 mb-2"}
                  `}
                >
                  Status
                </Label>
                <Select
                  value={data.status}
                  onValueChange={(value) => setData({ ...data, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {["active", "on_leave", "terminated"].map(value => (
                      <SelectItem key={value} value={value}>{getStaffStatusBadge(value)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label
                  htmlFor="staff-position"
                  className={`transition-all text-muted-foreground
                    ${data.position.trim() === "" ? "opacity-0 h-0 -translate-y-2" : "opacity-100 mb-2"}
                  `}
                >
                  Position
                </Label>
                <Select
                  value={data.position}
                  onValueChange={(value) => setData({ ...data, position: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All position</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Cashier">Cashier</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>

        </Card>

        <Card>
          <CardContent className="space-y-4">
            <ImageUploader
              value={data.image}
              onChange={(value) => setData({ ...data, image: value || "" })}
              className="w-full h-80 rounded-lg border object-contain"
              label="Staff Profile Picture"
              description="Upload a profile picture for this staff."
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
