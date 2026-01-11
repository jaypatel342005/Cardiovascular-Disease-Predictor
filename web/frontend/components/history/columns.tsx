"use client"

import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Trash2, Eye, ArrowUpDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

export interface HistoryItem {
  id: number
  timestamp: string
  name?: string
  dob?: string
  age: number
  gender: string
  height: number
  weight: number
  ap_hi: number
  ap_lo: number
  cholesterol: number
  gluc: number
  smoke: number
  alco: number
  active: number
  prediction: number
  probability: number
  risk_level: string
}

export const columns: ColumnDef<HistoryItem>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const name = row.getValue("name") as string
      return <div className="font-medium">{name || "Unknown"}</div>
    },
    filterFn: (row, id, filterValue) => {
      const name = row.getValue(id) as string
      if (!name) return false
      return name.toLowerCase().includes(filterValue.toLowerCase())
    },
  },
  {
    accessorKey: "timestamp",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2"
        >
          Date & Time
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("timestamp"))
      return (
        <div className="font-medium">
          {format(date, "MMM d, yyyy")}
          <div className="text-xs text-muted-foreground">{format(date, "HH:mm")}</div>
        </div>
      )
    },
    filterFn: (row, id, filterValue) => {
      if (!filterValue) return true
      const timestamp = row.getValue(id) as string
      const rowDate = new Date(timestamp).toISOString().split('T')[0]
      const matches = rowDate === filterValue
      if (!matches) {
        console.log('Date comparison:', { rowDate, filterValue, matches })
      }
      return matches
    },
  },
  {
    accessorKey: "age",
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-8 px-2"
          >
            Age
            <ArrowUpDown className="ml-2 h-3 w-3" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      return <div className="text-center font-medium">{row.getValue("age")}</div>
    },
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => {
      const gender = row.getValue("gender") as string
      return <div className="capitalize">{gender === "female" || gender === "1" ? "Female" : "Male"}</div>
    },
  },
  {
    accessorKey: "probability",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2"
        >
          Risk %
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const probability = row.getValue("probability") as number
      let barColor = "bg-emerald-500";
      if (probability >= 0.65) barColor = "bg-red-500";
      else if (probability >= 0.40) barColor = "bg-orange-500";

      return (
        <div className="flex items-center gap-2">
          <div className="w-16 bg-muted rounded-full h-2 overflow-hidden">
            <div
              className={`h-full ${barColor}`}
              style={{ width: `${probability * 100}%` }}
            />
          </div>
          <span className="text-sm font-medium">{(probability * 100).toFixed(1)}%</span>
        </div>
      )
    },
  },
  {
    accessorKey: "risk_level",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2"
        >
          Result
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const probability = row.getValue("probability") as number;
      let riskLevel = "Low";
      let badgeVariant: "default" | "destructive" | "outline" | "secondary" = "default";
      let badgeClass = "bg-emerald-500 hover:bg-emerald-600";

      if (probability >= 0.65) {
          riskLevel = "High";
          badgeVariant = "destructive";
          badgeClass = "";
      } else if (probability >= 0.40) {
          riskLevel = "Moderate";
          badgeVariant = "default"; // or secondary, but we force color class
          badgeClass = "bg-orange-500 hover:bg-orange-600";
      }

      return (
        <Badge
          variant={badgeVariant}
          className={badgeClass}
        >
          {riskLevel} Risk
        </Badge>
      )
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row, table }) => {
      const item = row.original
      
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                // @ts-ignore - accessing custom meta
                table.options.meta?.onViewDetails(item)
              }}
            >
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={() => {
                // @ts-ignore - accessing custom meta
                table.options.meta?.onDelete(item.id)
              }}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
