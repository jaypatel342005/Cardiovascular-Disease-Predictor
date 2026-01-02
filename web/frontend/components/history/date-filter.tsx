"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"

interface DateFilterProps {
  onChange: (date: string) => void
}

export function DateFilter({ onChange }: DateFilterProps) {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>()
  const [inputValue, setInputValue] = React.useState("")

  const handleSelectDate = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate)
      // Format for display
      setInputValue(format(selectedDate, "MMM d, yyyy"))
      // Format for filtering (YYYY-MM-DD)
      const year = selectedDate.getFullYear()
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
      const day = String(selectedDate.getDate()).padStart(2, '0')
      const dateStr = `${year}-${month}-${day}`
      console.log('Filtering by date:', dateStr) // Debug log
      onChange(dateStr)
      setOpen(false)
    }
  }

  const handleClear = () => {
    setDate(undefined)
    setInputValue("")
    onChange("")
  }

  return (
    <div className="relative flex gap-2">
      <div className="relative flex-1">
        <Input
          value={inputValue}
          placeholder="Filter by date..."
          className="bg-background/50 border-input/50 pr-20 h-10"
          readOnly
          onClick={() => setOpen(true)}
        />
        <div className="absolute right-1 top-1/2 -translate-y-1/2 flex gap-1">
          {inputValue && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="h-7 px-2 text-xs"
            >
              Clear
            </Button>
          )}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                className="h-7 px-2"
              >
                <CalendarIcon className="size-3.5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto overflow-hidden p-0" align="end">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleSelectDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  )
}
