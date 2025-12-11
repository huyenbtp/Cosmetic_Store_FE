
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea";
import { Check, Banknote, ChevronRight, QrCode, TicketPercent } from "lucide-react";
import { IDiscountCode } from "@/interfaces/order.interface";
import { cn } from "@/lib/utils";

interface ConfirmPaymentSheetProps {
  subtotal: number;
  discount_amount: number;
  note: string;
  onChangeNote: (value: string) => void;
  discountCode: IDiscountCode | null;
  onOpenDiscountCodePicker: () => void;
  pointsUsed: number;
  paymentMethod: string;
  onChangePaymentMethod: (value: string) => void;
  onSubmit: () => void;
}

export default function CheckoutPaymentSheet({
  subtotal,
  discount_amount,
  note,
  onChangeNote,
  discountCode,
  onOpenDiscountCodePicker,
  pointsUsed,
  paymentMethod,
  onChangePaymentMethod,
  onSubmit,
}: ConfirmPaymentSheetProps) {

  const getPaymentIcon = (method: string) => {
    switch (method) {
      case "cash":
        return <Banknote className="w-4 h-4" />;
      case "bank_transfer":
        return <QrCode className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const total = subtotal - discount_amount - pointsUsed;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Process Payment</Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Order Payment</SheetTitle>
        </SheetHeader>

        <div className="px-6 flex flex-col flex-1 overflow-auto">
          {/** Notes */}
          <div className="space-y-2 mb-6">
            <Label>Notes</Label>
            <Textarea
              placeholder="Add any additional notes about this order..."
              value={note}
              onChange={(e) => onChangeNote(e.target.value)}
            />
          </div>

          {/** Apply Discount Code */}
          <div
            onClick={onOpenDiscountCodePicker}
            className="flex items-center justify-between mb-6 p-3 rounded-lg border cursor-pointer hover:bg-accent"
          >
            <div className="flex items-center">
              <TicketPercent className="w-4 h-4 mr-3" />
              <Label>Discount Code</Label>
            </div>

            {!discountCode ? (
              <div className="flex items-center">
                <Label>Apply</Label>
                <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            ) : (
              <Badge variant="secondary" className="rounded-sm p-1 bg-success1 text-green-600 dark:text-success1-foreground">
                -{discountCode.value}{discountCode.type === "percent" ? "%" : "₫"}
                <Check />
              </Badge>
            )}
          </div>

          {/** Payment Method */}
          <div className="space-y-2 mb-6">
            <Label>Payment Method</Label>
            <div className="flex justify-between gap-2">
              {["cash", "bank_transfer"].map((value) => (
                <Button
                  key={value}
                  variant="outline"
                  className={cn("flex-1",
                    paymentMethod === value ? "" : "border-border dark:border-border"
                  )}
                  onClick={() => onChangePaymentMethod(value)}
                >
                  {getPaymentIcon(value)}
                  {value === "cash" ? "Cash" : "Bank Transfer"}
                </Button>
              ))}
            </div>
          </div>

          {/* Total Summary */}
          <div className="mt-auto">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal:</span>
              <span>{subtotal.toLocaleString()} ₫</span>
            </div>
            <div className="flex justify-between text-sm mt-1 text-green-600 dark:text-success1-foreground">
              <span>Discount:</span>
              <span>-{discount_amount.toLocaleString()} ₫</span>
            </div>
            <div className="flex justify-between text-sm mt-1 text-green-600 dark:text-success1-foreground">
              <span>Points used:</span>
              <span>-{pointsUsed.toLocaleString()} ₫</span>
            </div>
            <div className="flex justify-between font-semibold border-t pt-2 mt-2">
              <span>Total:</span>
              <span className="text-green-600 dark:text-success1-foreground">{(total).toLocaleString()} ₫</span>
            </div>
          </div>
        </div>

        <SheetFooter>
          <Button type="submit" onClick={onSubmit}>
            Complete Payment
          </Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}