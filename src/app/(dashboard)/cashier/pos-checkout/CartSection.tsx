"use client"

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ImageWithFallback } from "@/components/layout/ImageWithFallback";
import { Minus, Plus, ShoppingBasket, Trash2 } from "lucide-react";
import { ICartItem } from "./page";

interface CartSectionProps {
  cartItems: ICartItem[];
  handleUpdateQuantity: (item: string, quantity: number) => void;
  handleRemoveFromCart: (item: string) => void;
}

export default function CartSection({
  cartItems,
  handleUpdateQuantity,
  handleRemoveFromCart,
}: CartSectionProps) {

  return (
    <>
      <Label className="text-md mb-3">
        Items ({cartItems.length})
      </Label>
      {/* Cart Items */}
      <div className="overflow-auto flex-1 mb-4 space-y-3">
        {cartItems.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            <ShoppingBasket className="w-24 h-24 p-5 border bg-accent/30 text-gray-300 mx-auto mb-4 rounded-full" />
            <p>Cart is empty</p>
          </div>
        ) : cartItems.map((item) => (
          <div key={item._id} className="flex gap-3 pb-3 border-b">
            <ImageWithFallback
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded-lg"
            />

            <div className="flex-1 flex flex-col mr-2">
              <div className="font-medium text-sm line-clamp-1 mb-2">{item.name}</div>

              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs text-muted-foreground/80">Price</p>
                  <p className="font-semibold text-sm text-green-600 dark:text-success1-foreground">
                    {item.price.toLocaleString()} ₫
                  </p>
                </div>

                <div className="flex items-center">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-6 w-6 rounded-full"
                    onClick={() => handleUpdateQuantity(item._id, -1)}
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="text-sm font-medium w-8 text-center">
                    {item.quantity}
                  </span>
                  <Button
                    size="sm"
                    className="h-6 w-6 rounded-full"
                    onClick={() => handleUpdateQuantity(item._id, 1)}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 ml-2 text-red-500 hover:text-red-600"
                    onClick={() => handleRemoveFromCart(item._id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}