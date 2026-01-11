"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, TrendingDown, TrendingUp, BarChart3 } from "lucide-react"

interface HistoryItem {
  id: number
  timestamp: string
  risk_level: string
  probability: number
}

interface StatsOverviewProps {
  history: HistoryItem[]
}

export function StatsOverview({ history }: StatsOverviewProps) {
  const totalAssessments = history.length
  
  // Calculate counts based on probability to ensure consistency with new thresholds
  let highRiskCount = 0;
  let moderateRiskCount = 0;
  let lowRiskCount = 0;

  history.forEach(item => {
      if (item.probability >= 0.65) {
          highRiskCount++;
      } else if (item.probability >= 0.40) {
          moderateRiskCount++;
      } else {
          lowRiskCount++;
      }
  });
  
  const stats = [
    {
      title: "Total Assessments",
      value: totalAssessments,
      icon: BarChart3,
      description: "All time",
      color: "text-blue-500",
      gradient: "from-blue-500/20 via-blue-500/10 to-transparent",
      borderColor: "border-blue-500/20"
    },
    {
      title: "Moderate Risk",
      value: moderateRiskCount,
      icon: Activity,
      description: `${totalAssessments > 0 ? ((moderateRiskCount / totalAssessments) * 100).toFixed(0) : 0}% of total`,
      color: "text-orange-500",
      gradient: "from-orange-500/20 via-orange-500/10 to-transparent",
      borderColor: "border-orange-500/20"
    },
    {
      title: "High Risk",
      value: highRiskCount,
      icon: TrendingUp,
      description: `${totalAssessments > 0 ? ((highRiskCount / totalAssessments) * 100).toFixed(0) : 0}% of total`,
      color: "text-red-500",
      gradient: "from-red-500/20 via-red-500/10 to-transparent",
      borderColor: "border-red-500/20"
    },
    {
      title: "Low Risk",
      value: lowRiskCount,
      icon: TrendingDown,
      description: `${totalAssessments > 0 ? ((lowRiskCount / totalAssessments) * 100).toFixed(0) : 0}% of total`,
      color: "text-emerald-500",
      gradient: "from-emerald-500/20 via-emerald-500/10 to-transparent",
      borderColor: "border-emerald-500/20"
    }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index} className={`backdrop-blur-sm bg-gradient-to-br ${stat.gradient} ${stat.borderColor} border`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
