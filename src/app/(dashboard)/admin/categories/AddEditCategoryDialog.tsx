import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IAddEditCategory, ICategory } from "@/interfaces/category.interface";
import { CategorySelect } from "../../../../components/layout/CategorySelect";

const NullCategory: IAddEditCategory = {
  _id: "",
  parent_id: null,
  name: "",
  slug: "",
};

interface AddEditCategoryDialogProps {
  initialData?: any;
  parentId: string | null;
  categoryList: ICategory[];
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function AddEditCategoryDialog({ initialData, parentId, categoryList, open, setOpen, }: AddEditCategoryDialogProps) {
  const [formData, setFormData] = useState<IAddEditCategory>(NullCategory);

  useEffect(() => {
    if (initialData) setFormData(initialData);
    else if (parentId) setFormData({ ...formData, parent_id: parentId });
    else setFormData(NullCategory);
  }, [initialData, parentId]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit" : "Add New"} Category
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-6">
          <div className="space-y-1">
            <Label
              htmlFor="category-name"
              className="text-muted-foreground"
            >
              Name
            </Label>
            <Input
              id="category-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter category's name"
              className="h-12"
            />
          </div>

          <div className="space-y-1">
            <Label
              htmlFor="category-slug"
              className="text-muted-foreground"
            >
              Slug
            </Label>
            <Input
              id="category-slug"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="Enter category's slug"
              className="h-12"
            />
          </div>

          <div className="space-y-1">
            <Label
              htmlFor="category-parent"
              className="text-muted-foreground"
            >
              Parent Category
            </Label>
            <CategorySelect
              mode="parent_category"
              categoryList={categoryList}
              selectedId={formData.parent_id}
              editingCategoryId={formData._id}
              onChange={(v) => setFormData({ ...formData, parent_id: v })}
              disabled={parentId !== null}
            />
          </div>

        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              size="lg"
              className="flex-1"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            size="lg"
            className="flex-1"
            onClick={() => setOpen(false)}
          >
            {initialData ? "Save" : "Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}