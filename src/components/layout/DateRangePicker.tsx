"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { type DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DateRangePicker({
  initialDateRange,
  onChange,
}: {
  initialDateRange: DateRange
  onChange: (r: DateRange | undefined) => void
}) {
  const [range, setRange] = React.useState<DateRange | undefined>(initialDateRange)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="input" className="gap-3 font-normal">
          {range?.from && range?.to
            ? `${range.from.toLocaleDateString()} - ${range.to.toLocaleDateString()}`
            : <span className="text-muted-foreground">Date Range</span>
          }
          <CalendarIcon />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto overflow-hidden p-0" align="center">
        <Calendar
          mode="range"
          selected={range}
          captionLayout="dropdown"
          onSelect={onChange}
        />
      </PopoverContent>
    </Popover>
  );
}
