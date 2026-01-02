"use client";

import { motion } from "framer-motion";
import { Lightbulb, Apple, Dumbbell, Brain, Heart, Cigarette } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface HealthTipsProps {
  tips: string[];
}

export function HealthTips({ tips }: HealthTipsProps) {
  if (!tips || tips.length === 0) return null;

  // Simple helper to guess icon based on text content
  const getIcon = (text: string) => {
    const t = text.toLowerCase();
    if (t.includes("diet") || t.includes("food") || t.includes("eat") || t.includes("sodium") || t.includes("fiber")) return Apple;
    if (t.includes("exercise") || t.includes("walk") || t.includes("activity") || t.includes("gym")) return Dumbbell;
    if (t.includes("smoke") || t.includes("smoking")) return Cigarette;
    if (t.includes("stress") || t.includes("mind")) return Brain;
    return Heart;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full h-full"
    >
      <Card className="h-full border-blue-500/20 bg-gradient-to-br from-blue-950/10 via-background to-background backdrop-blur-3xl shadow-2xl relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
            <Lightbulb className="w-32 h-32 text-blue-500" />
        </div>

        <CardHeader className="pb-4 border-b border-border/40 bg-blue-500/5">
          <div className="flex items-center gap-3">
             <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                 <Lightbulb size={22} strokeWidth={2.5} />
             </div>
             <div>
                <CardTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
                    AI Health Recommendations
                </CardTitle>
                <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-1">
                    Tailored to your profile
                </div>
             </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 gap-4">
            {tips.map((tip, index) => {
              const Icon = getIcon(tip);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="group relative p-4 rounded-2xl bg-gradient-to-br from-card/50 to-background border border-border/50 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative flex gap-4 items-start">
                      <div className="mt-0.5 min-w-[40px] h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 shadow-sm">
                          <Icon size={20} strokeWidth={2.5} />
                      </div>
                      <div className="space-y-1">
                          <h4 className="text-sm font-semibold text-foreground/90 leading-tight">Recommendation {index + 1}</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors">
                            {tip}
                          </p>
                      </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
