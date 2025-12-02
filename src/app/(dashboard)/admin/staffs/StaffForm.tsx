import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save } from "lucide-react";
import { getStaffStatusBadge } from "./StaffsFilter";
import dayjs from "dayjs";
import { IAddEditStaff } from "@/interfaces/staff.interface";
import ImageUploader from "@/components/layout/ImageUploader";

const NullStaff: IAddEditStaff = {
  full_name: "",
  gender: "",
  dob: "",
  phone: "",
  image: "",
  position: "",
  status: "",
  account: {
    username: "",
    password: "",
    role: "",
    status: "",
  },
};

interface StaffFormProps {
  mode: "create" | "edit";
  initialData?: IAddEditStaff;
  onSubmit: (data: IAddEditStaff) => void;
}

export default function StaffForm({ mode, initialData, onSubmit }: StaffFormProps) {
  const [data, setData] = useState(initialData ?? NullStaff);
  const [accountData, setAccountData] = useState(data.account);
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    setData({ ...data, account: accountData });
  }, [accountData]);

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
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
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

              <div>
                <Label
                  htmlFor="staff-status"
                  className={`transition-all text-muted-foreground
                    ${data.status.trim() === "" ? "opacity-0 h-0 -translate-y-2" : "opacity-100 mb-2"}
                  `}
                >
                  Employment Status
                </Label>
                <Select
                  value={data.status}
                  onValueChange={(value) => setData({ ...data, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Employment Status" />
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
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="cashier">Cashier</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <Label
                  htmlFor="account-username"
                  className={`transition-all text-muted-foreground
                    ${accountData.username.trim() === "" ? "opacity-0 h-0 -translate-y-2" : "opacity-100 mb-2"}
                  `}
                >
                  Username
                </Label>
                <Input
                  id="account-username"
                  value={accountData.username}
                  onChange={(e) => setAccountData({ ...accountData, username: e.target.value })}
                  placeholder="Account's Username"
                  className="h-12"
                />
              </div>
              {mode === "create" &&
                <>
                  <div>
                    <Label
                      htmlFor="account-password"
                      className={`transition-all text-muted-foreground
                        ${(!accountData.password || accountData.password.trim() === "") ? "opacity-0 h-0 -translate-y-2" : "opacity-100 mb-2"}
                      `}
                    >
                      Password
                    </Label>
                    <Input
                      id="account-password"
                      type="password"
                      value={accountData.password}
                      onChange={(e) => setAccountData({ ...accountData, password: e.target.value })}
                      placeholder="Password"
                      className="h-12"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="account-confirm-password"
                      className={`transition-all text-muted-foreground
                        ${confirmPassword.trim() === "" ? "opacity-0 h-0 -translate-y-2" : "opacity-100 mb-2"}
                      `}
                    >
                      Confirm Password
                    </Label>
                    <Input
                      id="account-confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm Password"
                      className="h-12"
                    />
                  </div>
                </>
              }

              <div>
                <Label
                  htmlFor="account-role"
                  className={`transition-all text-muted-foreground
                    ${accountData.role.trim() === "" ? "opacity-0 h-0 -translate-y-2" : "opacity-100 mb-2"}
                  `}
                >
                  Role
                </Label>
                <Select
                  value={accountData.role}
                  onValueChange={(value) => setAccountData({ ...accountData, role: value })}
                >
                  <SelectTrigger size="default" className="w-full">
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="cashier">Cashier</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label
                  htmlFor="account-status"
                  className={`transition-all text-muted-foreground
                    ${accountData.status.trim() === "" ? "opacity-0 h-0 -translate-y-2" : "opacity-100 mb-2"}
                  `}
                >
                  Account Status
                </Label>
                <Select
                  value={accountData.status}
                  onValueChange={(value) => setAccountData({ ...accountData, status: value })}
                >
                  <SelectTrigger size="default" className="w-full">
                    <SelectValue placeholder="Select Account Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {["active", "inactive"].map(value => (
                      <SelectItem key={value} value={value}>{getStaffStatusBadge(value)}</SelectItem>
                    ))}
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
