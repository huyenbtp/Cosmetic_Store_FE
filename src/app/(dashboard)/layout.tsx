"use client";

import { useState, useEffect } from "react";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { useRouter } from "next/navigation";
import { getRole } from "@/lib/auth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [role, setRole] = useState<"admin" | "cashier" | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedRole = getRole() as
      | "admin"
      | "cashier"
      | null;
    if (!savedRole) {
      router.push("/login");
    } else {
      setRole(savedRole);
    }
    console.log("saved role: " + savedRole)
  }, [router]);

  if (!role) return null;

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar
        role={role}
        activeSection={activeSection}
        onSectionChange={(section) => setActiveSection(section)}
      />

      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
