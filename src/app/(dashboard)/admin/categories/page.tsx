"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Edit, Eye, Plus, Trash2 } from "lucide-react"
import { ICategory } from "@/interfaces/category.interface"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import CategoriesTree from "./CategoriesTree"

const mockCategories: ICategory[] = [
  {
    _id: "1",
    parent_id: null,
    name: "Skincare",
    slug: "skincare",
  },
  {
    _id: "2",
    parent_id: "1",
    name: "Cleanser",
    slug: "cleanser",
  },
  {
    _id: "3",
    parent_id: "1",
    name: "Toner",
    slug: "toner",
  },
  {
    _id: "4",
    parent_id: "2",
    name: "Makeup Remover",
    slug: "makeup-remover",
  },
  {
    _id: "6",
    parent_id: "2",
    name: "Exfoliators/Scrub",
    slug: "exfoliators-scrub",
  },
  {
    _id: "7",
    parent_id: "1",
    name: "Suncare",
    slug: "suncare",
  },
  {
    _id: "8",
    parent_id: null,
    name: "Makeup",
    slug: "makeup",
  },
  {
    _id: "9",
    parent_id: "8",
    name: "Face",
    slug: "face",
  },
  {
    _id: "10",
    parent_id: "9",
    name: "Cushion",
    slug: "cushion",
  },
  {
    _id: "11",
    parent_id: "9",
    name: "Blush",
    slug: "blush",
  },
  {
    _id: "12",
    parent_id: "8",
    name: "Eyes",
    slug: "eyes",
  },
  {
    _id: "13",
    parent_id: "8",
    name: "Lips",
    slug: "lips",
  },
  {
    _id: "14",
    parent_id: null,
    name: "Personal Care",
    slug: "personal-care",
  },
  {
    _id: "15",
    parent_id: "14",
    name: "Body Care",
    slug: "body-care",
  },
  {
    _id: "16",
    parent_id: "14",
    name: "Hands Care",
    slug: "hands-care",
  },
  {
    _id: "17",
    parent_id: "14",
    name: "Oral",
    slug: "oral",
  },
  {
    _id: "18",
    parent_id: "14",
    name: "Fragnance",
    slug: "fragnance",
  },
];

// Fake tree API
async function fetchCategories() {
  return mockCategories;
}

export default function CategoriesPage() {
  const [data, setData] = useState<ICategory[]>([]);

  useEffect(() => {
    fetchCategories().then(setData)
  }, [])

  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<ICategory | null>(null);


  return (
    <div className="h-full flex flex-col px-8 py-6 space-y-6">
      <div className="flex h-9 items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Categories Management
        </h1>
      </div>

      <Card className="flex-1 overflow-hidden">
        <CardContent className="flex flex-1 overflow-hidden">
          {/* left: categories tree */}
          <div className="flex flex-col flex-2 border-r pr-8">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search categories..."
              className="m-1 h-10"
            />
            <div className="flex-1 overflow-y-auto my-4">
              <CategoriesTree
                data={data}
                search={search}
                selected={selected}
                setSelected={setSelected}
              />
            </div>
            <Button>
              <Plus />
              Add New Category
            </Button>
          </div>

          {/* right: detail panel */}
          <div className="flex-3 p-6 px-8 pl-14 ">
            {!selected ? (
              <p className="text-muted-foreground">
                Select a category to view details and edit.
              </p>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Category Details</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Name</label>
                    <Input value={selected.name} readOnly />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Slug</label>
                    <Input value={selected.slug} readOnly />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Parent Category Name</label>
                    <Input value={selected.parent_id ?? "None"} readOnly />
                  </div>

                  <div className="flex gap-3 mt-12">
                    <Button variant="default">
                      <Edit />
                      Save Changes
                    </Button>
                    <Button variant="outline">
                      <Plus />
                      Add Child
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => router.push(`products?category=${selected.slug}&page=1`)}
                    >
                      <Eye />
                      View All Products
                    </Button>
                    <Button variant="destructive">
                      <Trash2 />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
