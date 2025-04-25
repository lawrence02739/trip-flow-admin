
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DateRangePickerProps {
  date: DateRange | undefined;
  onSelect: (range: DateRange) => void;
  className?: string;
}

export function DateRangePicker({
  date,
  onSelect,
  className,
}: DateRangePickerProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Calendar
        initialFocus
        mode="range"
        defaultMonth={date?.from}
        selected={date}
        onSelect={(range) => {
          if (range) {
            onSelect(range);
          }
        }}
        numberOfMonths={2}
      />
    </div>
  );
}
