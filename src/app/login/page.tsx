"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { login } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState("admin");

  const handleLogin = () => {
    login(role);
    router.push(`/${role}/dashboard`);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-[400px]">
        <CardContent className="p-6 flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-center">Đăng nhập</h1>
          <input
            type="text"
            placeholder="Tên đăng nhập"
            className="border p-2 rounded-md"
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            className="border p-2 rounded-md"
          />
          
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border rounded p-2"
        >
          <option value="admin">Admin</option>
          <option value="cashier">Cashier</option>
        </select>
          <Button className="w-full" onClick={handleLogin}>Đăng nhập</Button>
        </CardContent>
      </Card>
    </main>
  );
}