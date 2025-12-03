"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { ICategory } from "@/interfaces/category.interface";

interface CategorySelectProps {
  mode: "category" | "parent_category";
  categoryList: ICategory[];
  selectedId: string | null;
  onChange: (newId: string | null) => void;
  editingCategoryId?: string;   // id của category đang edit trong mode chọn parent_category
  disabled?: boolean;
}

export function CategorySelect({
  mode,
  categoryList,
  selectedId,
  onChange,
  editingCategoryId,
  disabled = false,
}: CategorySelectProps) {
  const [open, setOpen] = useState(false);
  const selected = categoryList.find((c) => c._id === selectedId);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full h-12 justify-between"
          disabled={disabled}
        >
          {mode === "parent_category" && (selected ? selected.name : "No parent (root category)")}
          {mode === "category" && "Select Category"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search category..." />

          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>

            <CommandGroup>
              {mode === "parent_category" && (
                //Không chọn parent (root category)
                <CommandItem
                  onSelect={() => {
                    onChange(null);
                    setOpen(false);
                  }}
                >
                  <span>Root category</span>
                  {!selectedId && <Check className="ml-auto h-4 w-4" />}
                </CommandItem>
              )}

              {categoryList.map((cat) => {
                const isDisabled = mode === "parent_category" &&
                  (cat._id === editingCategoryId || cat.parent_id === editingCategoryId);

                return (
                  <CommandItem
                    key={cat._id}
                    disabled={isDisabled}
                    onSelect={() => {
                      onChange(cat._id);
                      setOpen(false);
                    }}
                  >
                    <span>{cat.name}</span>
                    {selectedId === cat._id && (<Check className="ml-auto h-4 w-4" />)}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover >
  );
}