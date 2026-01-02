"use client"

import { useState, useEffect } from "react"
import { StatsOverview } from "@/components/history/stats-overview"
import { DataTable } from "@/components/history/data-table"
import { columns, HistoryItem } from "@/components/history/columns"
import { DetailModal } from "@/components/history/detail-modal"
import { toast } from "sonner"
import { FileWarning, Loader2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { SiteFooter } from "@/components/site-footer"

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<number | number[] | null>(null)

  useEffect(() => {
    const fetchHistory = () => {
      try {
        const stored = localStorage.getItem('cardio_history')
        if (stored) {
          setHistory(JSON.parse(stored))
        }
      } catch (error) {
        console.error("Failed to fetch history", error)
        toast.error("Failed to load history")
      } finally {
        setLoading(false)
      }
    }

    fetchHistory()
  }, [])

  const handleViewDetails = (item: HistoryItem) => {
    setSelectedItem(item)
    setDetailsOpen(true)
  }

  const handleDelete = (id: number) => {
    setItemToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleBulkDelete = (ids: number[]) => {
    setItemToDelete(ids)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (!itemToDelete) return

    try {
      const ids = Array.isArray(itemToDelete) ? itemToDelete : [itemToDelete]
      const updated = history.filter(item => !ids.includes(item.id))
      localStorage.setItem('cardio_history', JSON.stringify(updated))
      setHistory(updated)
      toast.success(`Deleted ${ids.length} assessment${ids.length > 1 ? 's' : ''}`)
    } catch (error) {
      toast.error("Failed to delete")
    } finally {
      setDeleteDialogOpen(false)
      setItemToDelete(null)
    }
  }

  const handleExport = (format: 'csv' | 'json') => {
    try {
      if (format === 'json') {
        const dataStr = JSON.stringify(history, null, 2)
        const dataBlob = new Blob([dataStr], { type: 'application/json' })
        const url = URL.createObjectURL(dataBlob)
        const link = document.createElement('a')
        link.href = url
        link.download = `cardio-history-${new Date().toISOString()}.json`
        link.click()
      } else {
        // CSV export
        const headers = ['Date', 'Age', 'Gender', 'Risk Level', 'Probability']
        const rows = history.map(item => [
          new Date(item.timestamp).toLocaleString(),
          item.age,
          item.gender === "female" || item.gender === "1" ? "Female" : "Male",
          item.risk_level,
          (item.probability * 100).toFixed(1) + '%'
        ])
        const csv = [headers, ...rows].map(row => row.join(',')).join('\n')
        const dataBlob = new Blob([csv], { type: 'text/csv' })
        const url = URL.createObjectURL(dataBlob)
        const link = document.createElement('a')
        link.href = url
        link.download = `cardio-history-${new Date().toISOString()}.csv`
        link.click()
      }
      toast.success(`Exported as ${format.toUpperCase()}`)
    } catch (error) {
      toast.error("Failed to export")
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-10 px-4 min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (history.length === 0) {
    return (
      <div className="container mx-auto py-10 px-4 min-h-[calc(100vh-4rem)]">
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Assessment History</h1>
          <p className="text-muted-foreground">View your past cardiovascular risk predictions and track your health journey.</p>
        </div>

        <div className="flex flex-col items-center justify-center py-20 text-center space-y-6 bg-card/30 rounded-lg border border-border/50">
          <FileWarning className="w-16 h-16 text-muted-foreground/50" />
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">No Assessments Yet</h3>
            <p className="text-muted-foreground max-w-md">
              Start your health journey by taking your first cardiovascular risk assessment. Track your progress over time and monitor your health trends.
            </p>
          </div>
          <Link href="/assessment">
            <Button size="lg">Start Your First Assessment</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 px-4 min-h-[calc(100vh-4rem)] space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Assessment History</h1>
        <p className="text-muted-foreground">View your past cardiovascular risk predictions and track your health journey.</p>
      </div>

      <StatsOverview history={history} />

      <DataTable
        columns={columns}
        data={history}
        onViewDetails={handleViewDetails}
        onDelete={handleDelete}
        onBulkDelete={handleBulkDelete}
        onExport={handleExport}
      />

      <DetailModal
        item={selectedItem}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              {Array.isArray(itemToDelete) 
                ? `This will permanently delete ${itemToDelete.length} assessment${itemToDelete.length > 1 ? 's' : ''}.`
                : "This will permanently delete this assessment."}
              {" This action cannot be undone."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <SiteFooter className="mt-12 border-none bg-transparent" />
    </div>
  )
}
