import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Save } from "lucide-react";
import dayjs from "dayjs";
import { IAddEditImport } from "@/interfaces/import.interface";
import { IImportItemUI } from "@/interfaces/importItem.interface";
import AddEditImportItemDialog from "./AddImportItemDialog";
import { Textarea } from "@/components/ui/textarea";
import ImportItemsTable from "./ImportItemsTable";

const NullImport: IAddEditImport = {
  staff_id: "",
  items: [],
  products_updated: 0,
  items_imported: 0,
  total_amount: 0,
  note: "",
};

export interface IStaffCreated {
  _id: string;
  staff_code: string;
  full_name: string;
}

const mockStaff: IStaffCreated = {
  _id: "ADM-2025-0001",
  staff_code: "ADM-2025-0001",
  full_name: "Sarah Johnson"
}

interface ImportFormProps {
  onSubmit: (data: IAddEditImport) => void;
}

export default function ImportOrderForm({ onSubmit }: ImportFormProps) {
  const [staff, setStaff] = useState<IStaffCreated>({
    _id: "",
    staff_code: "",
    full_name: "",
  });
  const [items, setItems] = useState<IImportItemUI[]>([]);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const staff = mockStaff; // đổi thành fetch real user
    setStaff(staff);
  }, []);

  const handleAddItem = (selectedProduct: any, quantity: number, unitCost: number) => {
    setItems(prev => [
      ...prev,
      {
        product_id: selectedProduct._id,
        quantity,
        unit_price: unitCost,
        product: selectedProduct
      }
    ]);

    setIsAddItemOpen(false);
  };

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    setItems(items.map(item => {
      if (item.product_id === id) {
        return {
          ...item,
          quantity: newQuantity,
        };
      }
      return item;
    }));
  };

  const handleUpdateUnitCost = (id: string, newCost: number) => {
    setItems(items.map(item => {
      if (item.product_id === id) {
        return {
          ...item,
          unit_price: newCost,
        };
      }
      return item;
    }));
  };

  const handleRemoveItem = (product_id: string) => {
    setItems(items.filter(item => item.product_id !== product_id));
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => sum + item.unit_price * item.quantity, 0);

  const handleSubmit = () => {
    const payload: IAddEditImport = {
      staff_id: staff._id,
      items,
      products_updated: items.length,
      items_imported: totalItems,
      total_amount: totalAmount,
      note: notes,
    };

    onSubmit(payload);
  };

  return (
    <div className="h-full flex flex-col px-8 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex-1 mr-10">
          <h1 className="text-2xl font-semibold">
            New Import Order
          </h1>
          <p className="text-muted-foreground">
            Fill in the details below to create a new import order
          </p>
        </div>

        <Button
          onClick={handleSubmit}
        >
          <Save className="w-4 h-4 mr-2" />
          Add New Import Order
        </Button>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Import Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Created by:</span>
              <span className="font-medium">{staff.full_name}</span>
            </div>
            <div className="flex justify-between">
              <span>Created date:</span>
              <span className="font-medium">{dayjs(new Date()).format("DD/MM/YYYY")}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              id="notes"
              placeholder="Add any additional notes about this import order..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Import Items</CardTitle>

            <AddEditImportItemDialog
              open={isAddItemOpen}
              setOpen={setIsAddItemOpen}
              handleAddItem={handleAddItem}
              onAddNewProduct={() => { }}
            />
          </div>
        </CardHeader>

        <CardContent>
          {items.length === 0 ? (
            <div className="text-center pt-12 pb-24">
              <Package className="w-24 h-24 p-5 border bg-accent/30 text-gray-300 mx-auto mb-4 rounded-full" />
              <p className="text-muted-foreground">No items added yet</p>
              <p className="text-sm text-gray-400 mt-1">Click "Add Item" to start building your import order</p>
            </div>
          ) : (
            <>
              <ImportItemsTable
                data={items}
                handleUpdateQuantity={handleUpdateQuantity}
                handleUpdateUnitCost={handleUpdateUnitCost}
                handleRemoveItem={handleRemoveItem}
              />

              <div className="space-y-2 mt-2 py-4 border-t">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Products Updated:</span>
                  <span>{items.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Items Imported:</span>
                  <span>{totalItems}</span>
                </div>

                <div className="flex justify-between font-bold text-xl pt-4 border-t">
                  <span>Total Cost</span>
                  <span>{totalAmount.toLocaleString()} đ</span>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}