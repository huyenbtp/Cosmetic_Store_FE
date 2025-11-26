import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IAddEditCustomer } from "@/interfaces/customer.interface";

const NullCustomer: IAddEditCustomer = {
  _id: "",
  name: "",
  phone: "",
};

export default function AddEditCustomerDialog({
  initialData,
  open,
  setOpen,
}: {
  initialData?: any;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [formData, setFormData] = useState<IAddEditCustomer>(NullCustomer);

  useEffect(() => {
    if (initialData) setFormData(initialData);
    else setFormData(NullCustomer);
  }, [initialData]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit" : "Add New"} Customer
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-6">
          <div className="space-y-1">
            <Label
              htmlFor="customer-name"
              className="text-muted-foreground"
            >
              Full Name
            </Label>
            <Input
              id="customer-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter customer's full name"
              className="h-12"
            />
          </div>

          <div className="space-y-1">
            <Label
              htmlFor="customer-phone"
              className="text-muted-foreground"
            >
              Phone Number
            </Label>
            <Input
              id="customer-phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="Enter customer's phone number"
              className="h-12"
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              size="lg"
              className="flex-1"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            size="lg"
            className="flex-1"
            onClick={() => setOpen(false)}
          >
            {initialData ? "Save" : "Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}