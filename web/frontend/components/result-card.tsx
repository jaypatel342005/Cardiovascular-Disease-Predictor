"use client";

import { motion } from "framer-motion";
import { CheckCircle, AlertOctagon, Activity, HeartPulse, Brain, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ResultCardProps {
  prediction: number; // 0 or 1
  probability: number; // 0.0 to 1.0
  riskLevel: string;
}

export function ResultCard({ prediction, probability, riskLevel }: ResultCardProps) {
  const isHighRisk = prediction === 1;
  const percentage = Math.round(probability * 100);
  
  // Gauge Config
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  // Arc logic: we want a semi-circle gauge (180 degrees)
  // But let's stick to the full custom SVG gauge for better control
  const strokeDashoffset = circumference - (probability * circumference);

  const getRiskColor = (prob: number) => {
    if (prob < 0.3) return "text-emerald-500";
    if (prob < 0.7) return "text-orange-500";
    return "text-red-500";
  };

  const getRiskGradient = (prob: number) => {
     if (prob < 0.3) return "from-emerald-500 to-green-400";
     if (prob < 0.7) return "from-orange-500 to-amber-400";
     return "from-red-500 to-rose-400";
  };

  const riskColor = getRiskColor(probability);
  const riskGradient = getRiskGradient(probability);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full"
    >
      <Card
        className={cn(
          "overflow-hidden border shadow-2xl backdrop-blur-3xl relative z-10 h-full",
          isHighRisk
            ? "border-red-500/30 bg-gradient-to-br from-red-950/20 via-background to-background"
            : "border-emerald-500/30 bg-gradient-to-br from-emerald-950/20 via-background to-background"
        )}
      >
        <div className="absolute top-0 right-0 p-4 opacity-50">
            {isHighRisk ? <AlertOctagon className="w-24 h-24 text-red-500/10 rotate-12" /> : <CheckCircle className="w-24 h-24 text-emerald-500/10 rotate-12" />}
        </div>

        <CardHeader className="pb-2 relative z-10">
           <div className="flex justify-between items-start">
              <div>
                  <Badge variant="outline" className={cn("mb-2 uppercase tracking-widest text-[10px] py-1 px-3", isHighRisk ? "border-red-500/30 text-red-400 bg-red-500/5" : "border-emerald-500/30 text-emerald-400 bg-emerald-500/5")}>
                    AI Diagnosis
                  </Badge>
                  <CardTitle className="text-3xl md:text-4xl font-black tracking-tight flex items-center gap-3">
                    {isHighRisk ? (
                        <span className="text-red-500 drop-shadow-sm">High Risk</span>
                    ) : (
                        <span className="text-emerald-500 drop-shadow-sm">Low Risk</span>
                    )}
                  </CardTitle>
                  <CardDescription className="text-base mt-2 max-w-sm">
                      Our advanced AI model has analyzed your vitals and detected {isHighRisk ? "significant" : "minimal"} patterns associated with cardiovascular disease.
                  </CardDescription>
              </div>
           </div>
        </CardHeader>
        
        <CardContent className="flex flex-col items-center pt-8 relative z-10">
            
            {/* Main Gauge Visualization */}
            <div className="relative w-80 h-80 flex items-center justify-center mb-8">
                {/* Glow Effect */}
                <div className={cn("absolute inset-0 rounded-full blur-[50px] opacity-20", isHighRisk ? "bg-red-500" : "bg-emerald-500")}></div>

                <svg className="w-full h-full transform -rotate-90 relative z-10 drop-shadow-2xl" viewBox="0 0 256 256">
                    {/* Background Track */}
                    <circle
                        cx="128"
                        cy="128"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="16"
                        fill="transparent"
                        className="text-muted/10"
                        strokeLinecap="round"
                    />
                    {/* Active Progress Arc */}
                    <motion.circle
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                        cx="128"
                        cy="128"
                        r={radius}
                        stroke="url(#gradient)"
                        strokeWidth="16"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeLinecap="round"
                    />
                    {/* Defs for Gradient */}
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor={isHighRisk ? "#ef4444" : "#10b981"} />
                            <stop offset="100%" stopColor={isHighRisk ? "#b91c1c" : "#34d399"} />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Center Stats */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                     <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">Probability</span>
                     <div className={cn("text-7xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50")}>
                         {percentage}%
                     </div>
                     <Badge variant="secondary" className="mt-2 text-xs font-mono">
                         Confidence: {(probability > 0.8 || probability < 0.2) ? 'High' : 'Moderate'}
                     </Badge>
                </div>
            </div>

            {/* Detailed Metrics Grid */}
            <div className="grid grid-cols-2 gap-4 w-full">
                <div className="bg-card/30 rounded-xl p-4 border border-border/50 backdrop-blur-sm flex flex-col justify-center items-center text-center">
                    <Activity className="w-6 h-6 text-blue-500 mb-2" />
                    <span className="text-xl font-bold">{Math.round((probability + 0.1) * 100) / 10 >= 10 ? 9.8 : Math.round((probability + 0.1) * 10) / 10}/10</span>
                     <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Severity Score</span>
                </div>
                <div className="bg-card/30 rounded-xl p-4 border border-border/50 backdrop-blur-sm flex flex-col justify-center items-center text-center">
                    <HeartPulse className="w-6 h-6 text-pink-500 mb-2" />
                    <span className="text-xl font-bold">{isHighRisk ? "Action Req" : "Stable"}</span>
                     <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Status</span>
                </div>
            </div>

        </CardContent>
      </Card>
    </motion.div>
  );
}
