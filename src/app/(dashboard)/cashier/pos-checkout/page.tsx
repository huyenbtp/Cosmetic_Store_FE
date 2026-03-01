"use client"

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Phone, Search, Star, UserPlus } from "lucide-react";
import SearchBar from "@/components/layout/SearchBar";
import ProductsGrid from "./ProductsGrid";
import CartSection from "./CartSection";
import AddEditCustomerDialog from "@/components/layout/form/AddEditCustomerDialog";
import CheckoutPaymentSheet from "./CheckoutPaymentSheet";
import { ICustomer } from "@/interfaces/customer.interface";
import { IAddEditOrder, IDiscountCode } from "@/interfaces/order.interface";
import DiscountCodePickerDialog from "./DiscountCodePickerDialog";
import { ICheckoutProduct } from "@/interfaces/product.interface";
import productApi from "@/lib/api/product.api";
import orderApi from "@/lib/api/order.api";
import { Input } from "@/components/ui/input";
import customerApi from "@/lib/api/customer.api";

export interface ICartItem extends ICheckoutProduct {
  quantity: number;
}

/*
const cosmeticProducts: ICheckoutProduct[] = [
  {
    _id: "COS-001",
    name: "Hydrating Facial Serum maicbnh ựhdbkabcejcb",
    category: "Skincare",
    selling_price: 450900,
    stock_quantity: 25,
    image: "https://picsum.photos/200/300?random=1",
    brand: "GlowLab"
  },
  {
    _id: "COS-002",
    name: "Vitamin C Moisturizer",
    category: "Skincare",
    selling_price: 385000,
    stock_quantity: 30,
    image: "https://picsum.photos/200/300?random=2",
    brand: "PureGlow"
  },
  {
    _id: "COS-003",
    name: "Matte Liquid Lipstick",
    category: "Makeup",
    selling_price: 249000,
    stock_quantity: 42,
    image: "https://picsum.photos/200/300?random=3",
    brand: "ColorPop"
  },
  {
    _id: "COS-004",
    name: "Long-Wear Foundation",
    category: "Makeup",
    selling_price: 520000,
    stock_quantity: 18,
    image: "https://picsum.photos/200/300?random=4",
    brand: "Flawless"
  },
  {
    _id: "COS-005",
    name: "Rose Water Toner",
    category: "Skincare",
    selling_price: 289000,
    stock_quantity: 35,
    image: "https://picsum.photos/200/300?random=5",
    brand: "Nature's Best"
  },
  {
    _id: "COS-006",
    name: "Eyeshadow Palette",
    category: "Makeup",
    selling_price: 499000,
    stock_quantity: 22,
    image: "https://picsum.photos/200/300?random=6",
    brand: "Glam Studio"
  },
  {
    _id: "COS-007",
    name: "Anti-Aging Night Cream",
    category: "Skincare",
    selling_price: 685000,
    stock_quantity: 15,
    image: "https://picsum.photos/200/300?random=7",
    brand: "Youth Elixir"
  },
  {
    _id: "COS-008",
    name: "Waterproof Mascara",
    category: "Makeup",
    selling_price: 229000,
    stock_quantity: 50,
    image: "https://picsum.photos/200/300?random=8",
    brand: "LashPro"
  },
  {
    _id: "COS-009",
    name: "Gentle Cleansing Foam",
    category: "Skincare",
    selling_price: 320000,
    stock_quantity: 28,
    image: "https://picsum.photos/200/300?random=9",
    brand: "Pure Clean"
  },
  {
    _id: "COS-010",
    name: "Setting Spray",
    category: "Makeup",
    selling_price: 265000,
    stock_quantity: 38,
    image: "https://picsum.photos/200/300?random=10",
    brand: "FixIt"
  },
  {
    _id: "COS-011",
    name: "Floral Eau de Parfum",
    category: "Fragrance",
    selling_price: 899000,
    stock_quantity: 12,
    image: "https://picsum.photos/200/300?random=11",
    brand: "Essence"
  },
  {
    _id: "COS-012",
    name: "SPF 50 Sunscreen",
    category: "Skincare",
    selling_price: 349000,
    stock_quantity: 40,
    image: "https://picsum.photos/200/300?random=12",
    brand: "SunShield"
  }
];
*/

const mockCustomer: ICustomer = {
  _id: "1",
  name: "Sarah Johnson",
  phone: "0912345678",
  points: 10000,
  createdAt: "",
};

export default function POSCheckout() {
  const [products, setProducts] = useState<ICheckoutProduct[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [customerPhone, setCustomerPhone] = useState("");
  const [customer, setCustomer] = useState<ICustomer | null>(null);
  const [customerDialogMode, setCustomerDialogMode] = useState<"create" | "edit">("create");
  const [isAddEditCustomerDialogOpen, setIsAddEditCustomerDialogOpen] = useState(false);
  const [usePoint, setUsePoint] = useState(false);
  const [note, setNote] = useState("");
  const [discountCode, setDiscountCode] = useState<IDiscountCode | null>(null);
  const [isDiscountCodeDialogOpen, setIsDiscountCodeDialogOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const fetchProducts = async (reset = false) => {
    if (loading) return;
    setLoading(true);

    try {
      const data = await productApi.fetchProductsInfinite({
        q: search || undefined,
        page: reset ? 1 : page,
        limit: 6,
      });

      if (reset) {
        setProducts(data);
        setPage(2);
      } else {
        setProducts((prev) => [...prev, ...data]);
        setPage((prev) => prev + 1);
      }

      if (data.length < 6) {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Fetch products failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(true);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasMore(true);
      fetchProducts(true);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  const handleFetchMore = () => {
    fetchProducts();
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.selling_price * item.quantity), 0);
  const discount_amount = !discountCode ? 0
    : discountCode.type === "percent"
      ? (subtotal * discountCode.value / 100)
      : (subtotal - discountCode.value);

  const handleAddToCart = (product: ICheckoutProduct) => {
    const existingItem = cartItems.find(item => item._id === product._id);

    if (existingItem) {
      if (existingItem.quantity >= product.stock_quantity) {

        return;
      }
      setCartItems(cartItems.map(item =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }

  };

  const handleUpdateQuantity = (productId: string, change: number) => {
    const newCartItems = cartItems.map(item => {
      if (item._id === productId) {
        const newQuantity = item.quantity + change;
        if (newQuantity > item.stock_quantity) {
          return item;
        }
        if (newQuantity <= 0) {
          return item;
        }
        return { ...item, quantity: newQuantity };
      }
      return item;
    })
    const newSubtotal = newCartItems.reduce((sum, item) => sum + (item.selling_price * item.quantity), 0);
    if (discountCode && newSubtotal < discountCode.min_order_value) {
      setDiscountCode(null);
    }
    setCartItems(newCartItems);
  };

  const handleRemoveFromCart = (productId: string) => {
    const newCartItems = cartItems.filter(item => item._id !== productId);
    const newSubtotal = newCartItems.reduce((sum, item) => sum + (item.selling_price * item.quantity), 0);
    if (discountCode && newSubtotal < discountCode.min_order_value) {
      setDiscountCode(null);
    }
    setCartItems(newCartItems);
  };

  const handleSearchCustomer = async (phoneNumber: string) => {
    const phoneno = /^0\d{9}$/;
    if (!phoneNumber.match(phoneno)) {
      alert("Wrong phone number format");
      return;
    }

    const res = await customerApi.fetchCustomerByPhone(phoneNumber);
    if (res) setCustomer(res);
    else setCustomer(null);
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      return;
    }

    setLoading(true)

    try {
      const payload: IAddEditOrder = {
        customer_id: customer ? customer._id : null,
        discount_id: discountCode ? discountCode._id : null,
        items: cartItems.map((item) => ({
          product_id: item._id,
          unit_price: item.selling_price,
          quantity: item.quantity
        })),
        points_used: usePoint && customer ? customer.points : 0,
        note: note ?? "",
      }
      const res = await orderApi.createOrder(payload)

    } catch (error) {
      console.error("Create order failed:", error);
    } finally {
      setLoading(false)
      // Reset form
      setCartItems([]);
      setCustomer(null);
      setPaymentMethod("cash");
    }
  };

  return (
    <div className="px-8 pt-6 space-y-8 flex gap-6 h-full">
      {/* Products Section */}
      <div className="flex-2 flex flex-col gap-6 h-full">
        <div className="flex flex-col sm:flex-row gap-4">
          <SearchBar
            placeholder="Search products by name or SKU"
            onChange={(value) => setSearch(value)}
          />
        </div>
        <div className="flex-1 overflow-auto pb-4">
          <ProductsGrid
            loading={loading}
            hasMore={hasMore}
            onMore={handleFetchMore}
            data={products || []}
            handleAddToCart={handleAddToCart}
          />
        </div>
      </div>

      {/* Cart Section */}
      <div className="flex-1 pb-6">
        <Card className="h-full">
          <CardContent className="flex flex-col flex-1 overflow-hidden">
            {/* Customer Info */}
            <div className="mb-4 space-y-2 border-b" >
              <Label className="text-md">Customer Information</Label>
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <Input
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSearchCustomer(customerPhone)
                    }}
                    placeholder="Search by phone number"
                    className="w-full"
                  />
                </div>
                <Button
                  onClick={() => handleSearchCustomer(customerPhone)}
                >
                  <Search />
                </Button>
              </div>

              <div className="mb-4">
                {!customer ? (
                  <Button
                    onClick={() => {
                      setCustomer(null);
                      setCustomerDialogMode("create");
                      setIsAddEditCustomerDialogOpen(true)
                    }}
                  >
                    <UserPlus className="mr-1" />
                    New
                  </Button>

                ) : (
                  <div className="flex text-sm bg-accent/50 py-2.5 px-4 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium text-primary">{customer.name}</div>
                      <div className="text-muted-foreground flex items-center gap-3">
                        <Phone className="w-3 h-3" />
                        {customer.phone}
                      </div>
                      <div className="text-muted-foreground flex items-center">
                        <Star className="w-3 h-3 mr-3" />
                        <span className="font-medium mr-1">{customer.points}</span>
                        points
                      </div>
                    </div>
                    <div className="self-end">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setCustomerDialogMode("edit");
                          setIsAddEditCustomerDialogOpen(true)
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => { setCustomer(null) }}
                      >
                        Clear
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <CartSection
              cartItems={cartItems}
              handleUpdateQuantity={handleUpdateQuantity}
              handleRemoveFromCart={handleRemoveFromCart}
            />

            {/* Total Summary */}
            {customer && customer.points > 0 &&
              <div className="flex justify-between text-sm mt-1 text-green-600 dark:text-success1-foreground">
                <span>Use {customer?.points.toLocaleString()} points</span>
                <Switch
                  checked={usePoint}
                  onCheckedChange={(checked) => setUsePoint(checked)}
                  className="data-[state=checked]:bg-green-600 dark:data-[state=checked]:bg-success1-foreground/80"
                />
              </div>
            }
            <div className="flex justify-between font-semibold border-t pt-4 mt-2 mb-8">
              <span>Subtotal:</span>
              <span className="text-green-600 dark:text-success1-foreground">{subtotal.toLocaleString()} ₫</span>
            </div>

            {/* Checkout Button */}
            <CheckoutPaymentSheet
              subtotal={subtotal}
              discount_amount={discount_amount}
              note={note}
              onChangeNote={setNote}
              discountCode={discountCode}
              onOpenDiscountCodePicker={() => setIsDiscountCodeDialogOpen(true)}
              pointsUsed={customer && usePoint ? customer.points : 0}
              paymentMethod={paymentMethod}
              onChangePaymentMethod={setPaymentMethod}
              onSubmit={handleCheckout}
            />
          </CardContent>
        </Card>
      </div>

      <AddEditCustomerDialog
        mode={customerDialogMode}
        initialData={customer}
        setData={setCustomer}
        open={isAddEditCustomerDialogOpen}
        setOpen={setIsAddEditCustomerDialogOpen}
      />

      <DiscountCodePickerDialog
        open={isDiscountCodeDialogOpen}
        onOpenChange={setIsDiscountCodeDialogOpen}
        subtotal={subtotal}
        selectedCodeId={discountCode?._id || null}
        onSelect={setDiscountCode}
      />
    </div>
  );
}