"use client"

import * as React from "react"
import { parseDate } from "chrono-node"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

function formatDate(date: Date | undefined) {
  if (!date) {
    return ""
  }

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

interface DOBInputProps {
  value: string
  onChange: (date: string) => void
  disabled?: boolean
}

export function DOBInput({ value, onChange, disabled }: DOBInputProps) {
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState(value || "")
  const [date, setDate] = React.useState<Date | undefined>(
    value ? new Date(value) : undefined
  )
  const [month, setMonth] = React.useState<Date | undefined>(date || new Date(2000, 0))

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  React.useEffect(() => {
    if (value && value !== inputValue) {
      const parsedDate = new Date(value)
      setDate(parsedDate)
      setInputValue(formatDate(parsedDate))
    }
  }, [value])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setInputValue(val)
    
    const parsedDate = parseDate(val)
    if (parsedDate) {
      // Prevent future dates
      if (parsedDate > today) {
        return
      }
      
      const dateStr = parsedDate.toISOString().split('T')[0]
      setDate(parsedDate)
      setMonth(parsedDate)
      onChange(dateStr)
    }
  }

  const handleSelectDate = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      // Prevent future dates
      if (selectedDate > today) {
        return
      }
      
      const dateStr = selectedDate.toISOString().split('T')[0]
      setDate(selectedDate)
      setInputValue(formatDate(selectedDate))
      onChange(dateStr)
      setOpen(false)
    }
  }

  const handleBlur = () => {
    // On blur, if there's a valid date, format it nicely
    if (date) {
      setInputValue(formatDate(date))
    }
  }

  return (
    <div className="relative flex gap-2">
      <Input
        value={inputValue}
        placeholder="e.g., January 19, 2000"
        className="bg-background/50 border-input/50 pr-10 h-10"
        disabled={disabled}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault()
            setOpen(true)
          }
        }}
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            disabled={disabled}
            className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
          >
            <CalendarIcon className="size-3.5" />
            <span className="sr-only">Select date</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="end">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            month={month}
            onMonthChange={setMonth}
            onSelect={handleSelectDate}
            fromYear={1900}
            toYear={new Date().getFullYear()}
            defaultMonth={month}
            disabled={(date) => date > today}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
