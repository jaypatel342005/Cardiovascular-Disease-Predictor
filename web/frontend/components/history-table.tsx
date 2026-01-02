"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, History as HistoryIcon } from "lucide-react";

interface HistoryItem {
    id: number;
    timestamp: string;
    age: number;
    gender: number | string; // 1: female, 2: male OR "female"/"male"
    risk_level: string;
    probability: number;
}

export function HistoryTable() {
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = () => {
            try {
                const stored = localStorage.getItem('cardio_history');
                if (stored) {
                    setHistory(JSON.parse(stored));
                }
            } catch (error) {
                console.error("Failed to fetch history", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center p-10">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (history.length === 0) {
        return (
            <div className="text-center p-10 text-muted-foreground">
                <p>No history found. Run a prediction to see it here.</p>
            </div>
        );
    }

    return (
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <HistoryIcon className="w-5 h-5 text-primary" />
                    Recent Assessments
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Age</TableHead>
                                <TableHead>Gender</TableHead>
                                <TableHead>Risk Probability</TableHead>
                                <TableHead className="text-right">Result</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {history.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{format(new Date(item.timestamp), 'MMM d, yyyy HH:mm')}</TableCell>
                                    <TableCell>{item.age}</TableCell>
                                    <TableCell>{(item.gender === 1 || item.gender === 'female') ? 'Female' : 'Male'}</TableCell>
                                    <TableCell>{(item.probability * 100).toFixed(1)}%</TableCell>
                                    <TableCell className="text-right">
                                        <Badge variant={item.risk_level === 'High' ? 'destructive' : 'default'} className={item.risk_level === 'Low' ? 'bg-emerald-500 hover:bg-emerald-600' : ''}>
                                            {item.risk_level} Risk
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
