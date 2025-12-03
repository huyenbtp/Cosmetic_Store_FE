import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CategorySelect } from "../../../../components/layout/CategorySelect";
import { Edit, Eye, Plus } from "lucide-react"
import { ICategory } from "@/interfaces/category.interface";

interface CategoryDetailCardProps {
  data: ICategory;
  categoryList: ICategory[];
  onSaveChanges: () => void;
  onAddChild: () => void;
  onViewProducts: () => void;
}

export default function CategoryDetailCard({
  data,
  categoryList,
  onSaveChanges,
  onAddChild,
  onViewProducts,
}: CategoryDetailCardProps) {
  const [selectedChanges, setSelectedChanges] = useState<ICategory>(data);

  useEffect(() => {
    setSelectedChanges(data)
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Category Details</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="category-name">Name</Label>
          <Input
            id="category-name"
            value={selectedChanges.name}
            onChange={(e) => { setSelectedChanges({ ...selectedChanges, name: e.target.value }) }}
            placeholder="Enter category's name"
            className="h-12"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="category-slug">Slug</Label>
          <Input
            id="category-slug"
            value={selectedChanges.slug}
            onChange={(e) => { setSelectedChanges({ ...selectedChanges, slug: e.target.value }) }}
            placeholder="Enter category's slug"
            className="h-12"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="category-parent">Parent Category</Label>
          <CategorySelect
            mode="parent_category"
            categoryList={categoryList}
            selectedId={selectedChanges.parent_id}
            editingCategoryId={selectedChanges._id}
            onChange={(v) => { setSelectedChanges({ ...selectedChanges, parent_id: v }) }}
          />
        </div>

        <div className="flex gap-3 mt-12">
          <Button
            variant="default"
            disabled={
              data.name === selectedChanges.name &&
              data.slug === selectedChanges.slug &&
              data.parent_id === selectedChanges.parent_id
            }
            onClick={onSaveChanges}
          >
            <Edit />
            Save Changes
          </Button>
          <Button
            variant="outline"
            onClick={onAddChild}
          >
            <Plus />
            Add Child
          </Button>
          <Button
            variant="outline"
            onClick={onViewProducts}
          >
            <Eye />
            View All Products
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}