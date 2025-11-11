"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  Archive,
  Percent,
  Bell,
  Home,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DashboardSidebarProps {
  role: "admin" | "cashier";
}

const navigationItems = {
  admin: [
    { href: "/admin/dashboard", label: "Dashboard", icon: Home },
    { href: "/admin/cashiers", label: "Cashiers", icon: User },
    { href: "/admin/products", label: "Products", icon: Package },
    { href: "/admin/stock", label: "Stock", icon: Archive },
    { href: "/admin/customers", label: "Customers", icon: Users },
    { href: "/admin/promotions", label: "Promotions", icon: Percent },
    { href: "/admin/analytics", label: "Analytics", icon: TrendingUp },
  ],
  cashier: [
    { href: "/cashier/dashboard", label: "Dashboard", icon: Home },
    { href: "/cashier/checkout", label: "Checkout", icon: ShoppingCart },
    { href: "/cashier/customers", label: "Customers", icon: Users },
    { href: "/cashier/daily-summary", label: "Daily summary", icon: Bell },
  ],
};

export default function DashboardSidebar({ role }: DashboardSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const items = navigationItems[role];
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "bg-sidebar border-r  transition-all duration-300 flex-shrink-0",
        isCollapsed ? "w-20" : "w-70"
      )}
      style={{ minHeight: '100vh' }}
    >
      <div className="p-4">
        <div
          className={cn(
            "flex items-center mb-10",
            isCollapsed ? "justify-center" : "justify-between"
          )}
        >
          {!isCollapsed && (
            <span className="text-2xl font-semibold ml-3">Hello</span>
          )}
          <button
            className="rounded-full p-2.5 hover:bg-sidebar-hover"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed
              ? <ChevronRight className="w-5 h-5 text-primary" />
              : <ChevronLeft className="w-5 h-5 text-primary" />
            }
          </button>
        </div>

        <nav className="space-y-2">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-4 h-12 px-3 rounded-lg transition-colors",
                  isActive
                    ? "bg-sidebar-active text-sidebar-active-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-hover hover:text-sidebar-hover-foreground"
                )}
              >
                <div className="w-6 h-6 flex-shrink-0 flex justify-center items-center">
                  <Icon className="w-5 h-5" />
                </div>

                {!isCollapsed && <span className="text-truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
