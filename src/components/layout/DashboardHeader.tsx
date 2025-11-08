import { Search, Bell, User, Settings, LogOut, Sun, Moon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from 'next-themes'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { logout } from "@/lib/auth";
import { useRouter } from "next/navigation";

export function DashboardHeader() {
  const { theme, setTheme } = useTheme()
  const router = useRouter();

  return (
    <header className="bg-background border-b px-5 py-3 flex items-center justify-end">
      {/**
       <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold">Unleashed Dashboard</h1>
      </div>
      */}

      <div className="flex items-center gap-4">
        {/**
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input 
            placeholder="Search..." 
            className="pl-10 bg-[#F8F5EE] border-gray-200"
          />
        </div>
         */}
        <button
          className="rounded-full p-2.5 hover:bg-secondary"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme == "light"
            ? <Sun className="w-4 h-4" />
            : <Moon className="w-4 h-4" />
          }
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-avatar.jpg" alt="Admin" />
                <AvatarFallback className="bg-primary text-white">A</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuItem onClick={() => { }}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => { }}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => {
              logout()
              router.push("/login");
            }}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}