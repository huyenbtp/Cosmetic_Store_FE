"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Circle, CircleDot, Edit, Phone, Save, } from "lucide-react";
import ProfileTab from "./ProfileTab";
import { useRouter } from "next/navigation";
import { IStaffDetail } from "@/interfaces/staff.interface";
import dayjs from "dayjs";
import { Card, CardContent } from "@/components/ui/card";
import { ImageWithFallback } from "@/components/layout/ImageWithFallback";
import { Badge } from "@/components/ui/badge";
import { getStaffStatusBadge } from "../StaffsFilter";
import PurchasesHandledTab from "./PurchasesHandledTab";

const mockStaff: IStaffDetail = {
  _id: '1',
  full_name: "Sarah Johnson",
  gender: "Female",
  dob: "1998-02-25T00:00:00",
  phone: "0123456789",
  image: "https://picsum.photos/200/300",
  position: "Cashier",
  status: "active",
  account_id: "1",
  createdAt: "2025-01-15T09:30:00",
  updatedAt: "2025-11-26T09:30:00",
  purchasesHandled: [
    {
      _id: "REC-001",
      receipt_code: "REC-29112025-122530",
      customerName: "Mike Chen",
      date: "2025-11-26T08:00:00",
      final_amount: 565500,
      payment_method: "Cash",
    },
    {
      _id: "REP-015",
      receipt_code: "REC-015",
      customerName: "Emma Wilson",
      date: "2025-10-11T09:30:00",
      final_amount: 825200,
      payment_method: "Bank Transfer",
    },
    {
      _id: "REP-022",
      receipt_code: "REC-022",
      customerName: "David Brown",
      date: "2025-07-28T08:00:00",
      final_amount: 374100,
      payment_method: "Bank Transfer",
    },
    {
      _id: "REP-031",
      receipt_code: "REC-031",
      customerName: "Lisa Garcia",
      date: "2025-06-12T09:30:00",
      final_amount: 1100000,
      payment_method: "Cash",
    },
    {
      _id: "REP-045",
      receipt_code: "REC-045",
      customerName: "James Taylor",
      date: "2025-05-03T09:30:00",
      final_amount: 425500,
      payment_method: "Bank Transfer",
    }
  ]
};

export default function ProductDetail() {
  const router = useRouter();
  const [data, setData] = useState<IStaffDetail>(mockStaff);

  return (
    <div className="px-8 py-6 space-y-6 flex flex-col h-full">
      <Card className="py-4">
        <CardContent className="flex gap-4 px-4">
          <ImageWithFallback
            src={data.image}
            alt={data.full_name}
            className="w-30 h-30 rounded-lg object-cover"
          />
          <div className="flex flex-col flex-1 mr-10">
            <h1 className="text-2xl font-semibold">{data.full_name}</h1>
            <p className="flex-1 text-muted-foreground">
              <Badge variant="outline">
                {data.position}
              </Badge> - Employee since {dayjs(data.createdAt).format("MMM D, YYYY")}
            </p>
            <div className="flex items-center gap-2">
              <Phone size={16} />
              <p className="text-muted-foreground text-sm">
                Phone: <span className="text-foreground">{data.phone}</span>
              </p>
              {getStaffStatusBadge(data.status)}
            </div>
          </div>

          <div className="flex flex-col self-end gap-3">
            <Button
              variant="outline"
              onClick={() => { }}
            >
              <Edit className="w-4 h-4 mr-2" />
              View Account
            </Button>

            <Button
              className="justify-start"
              onClick={() => { }}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Staff
            </Button>
          </div>
        </CardContent>
      </Card>


      <Tabs defaultValue="profile" className="w-full space-y-1 h-full">
        <TabsList className="space-x-2">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          {data.position === "Cashier" &&
            <TabsTrigger value="purchasesHandled">Purchases Handled</TabsTrigger>
          }
        </TabsList>

        <TabsContent value="profile" className="space-y-6 h-full">
          <ProfileTab data={data} setData={setData} />
        </TabsContent>

        <TabsContent value="purchasesHandled" className="space-y-6">
          {data.position === "Cashier" &&
            <PurchasesHandledTab data={data.purchasesHandled} />
          }
        </TabsContent>
      </Tabs>
    </div>
  );
}