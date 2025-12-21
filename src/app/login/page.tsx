"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { login } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTheme } from 'next-themes'
import { Moon, Sun } from "lucide-react";

export default function LoginPage() {
  const { theme, setTheme } = useTheme()
  const router = useRouter();
  const [role, setRole] = useState("admin");

  const handleLogin = () => {
    login(role);
    router.push(`/${role}/dashboard`);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted">
      {/** 
        <button
          className="rounded-full p-2.5 hover:bg-accent cursor-pointer absolute top-3 right-6"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme == "light"
            ? <Sun className="w-4 h-4" />
            : <Moon className="w-4 h-4" />
          }
        </button>
      */}
      <Card className="w-[400px]">
        <CardContent className="px-8 py-4 flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-center mb-4">Login to your account</h1>
          <input
            type="text"
            placeholder="Username"
            className="border p-2 pl-4 rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 pl-4 rounded-md"
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border rounded p-2"
          >
            <option value="admin">Admin</option>
            <option value="cashier">Cashier</option>
          </select>
          <Button className="w-full" onClick={handleLogin}>Login</Button>
        </CardContent>
      </Card>
    </main>
  );
}