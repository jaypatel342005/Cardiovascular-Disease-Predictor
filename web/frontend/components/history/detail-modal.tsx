"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { HistoryItem } from "./columns"

interface DetailModalProps {
  item: HistoryItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DetailModal({ item, open, onOpenChange }: DetailModalProps) {
  if (!item) return null

  const details = [
    { label: "Assessment Date", value: format(new Date(item.timestamp), "PPpp") },
    { label: "Age", value: `${item.age} years` },
    { label: "Gender", value: item.gender === "female" || item.gender === "1" ? "Female" : "Male" },
    { label: "Height", value: `${item.height} cm` },
    { label: "Weight", value: `${item.weight} kg` },
    { label: "BMI", value: ((item.weight / Math.pow(item.height / 100, 2))).toFixed(1) },
    { label: "Systolic BP", value: `${item.ap_hi} mmHg` },
    { label: "Diastolic BP", value: `${item.ap_lo} mmHg` },
    { label: "Cholesterol", value: item.cholesterol === 1 ? "Normal" : item.cholesterol === 2 ? "Elevated" : "High" },
    { label: "Glucose", value: item.gluc === 1 ? "Normal" : item.gluc === 2 ? "Elevated" : "High" },
    { label: "Smoking", value: item.smoke === 1 ? "Yes" : "No" },
    { label: "Alcohol", value: item.alco === 1 ? "Yes" : "No" },
    { label: "Physical Activity", value: item.active === 1 ? "Active" : "Inactive" },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Assessment Details
            {(() => {
                let riskLevel = "Low";
                let badgeClass = "bg-emerald-500 hover:bg-emerald-600";
                let badgeVariant: "default" | "destructive" | "outline" | "secondary" = "default";

                if (item.probability >= 0.65) {
                    riskLevel = "High";
                    badgeClass = "bg-red-500 hover:bg-red-600";
                    badgeVariant = "destructive";
                } else if (item.probability >= 0.40) {
                    riskLevel = "Moderate";
                    badgeClass = "bg-orange-500 hover:bg-orange-600";
                }

                return (
                    <Badge
                      variant={badgeVariant}
                      className={badgeClass}
                    >
                      {riskLevel} Risk
                    </Badge>
                );
            })()}
          </DialogTitle>
          <DialogDescription>
            Risk Probability: {(item.probability * 100).toFixed(1)}%
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            {details.map((detail, index) => (
              <div key={index} className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">{detail.label}</p>
                <p className="text-sm font-semibold">{detail.value}</p>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
