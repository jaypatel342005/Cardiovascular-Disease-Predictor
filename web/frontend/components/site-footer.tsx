"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, Linkedin, Heart, Activity } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function SiteFooter({ className }: { className?: string }) {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className={cn("w-full py-8 border-t border-border/40 bg-background/50 backdrop-blur-sm", className)}
    >
      <div className="container mx-auto px-4 flex flex-col items-center gap-6 text-center">
        
        {/* Social Links */}
        <div className="flex items-center gap-4">
            <Link 
                href="https://github.com/jaypatel342005/Cardiovascular-Disease-Predictor" 
                target="_blank"
                className="p-2 rounded-full bg-muted/30 hover:bg-muted/80 hover:scale-110 transition-all duration-300 text-muted-foreground hover:text-foreground"
            >
                <Github size={18} />
            </Link>
            <Link 
                href="https://www.linkedin.com/in/jaypatel345/" 
                target="_blank"
                className="p-2 rounded-full bg-muted/30 hover:bg-blue-500/10 hover:scale-110 transition-all duration-300 text-muted-foreground hover:text-blue-500"
            >
                <Linkedin size={18} />
            </Link>
             <Link 
                href="https://www.kaggle.com/code/jaypatel345/master-cardiovascular-disease-prediction" 
                target="_blank"
                className="p-2 rounded-full bg-muted/30 hover:bg-blue-400/10 hover:scale-110 transition-all duration-300 text-muted-foreground hover:text-blue-400"
            >
                <ExternalLink size={18} />
            </Link>
        </div>

        {/* Branding & Credits */}
        <div className="space-y-2">
             <div className="flex items-center justify-center gap-2 text-sm font-semibold tracking-tight text-foreground/80">
                <Activity className="w-4 h-4 text-primary" />
                <span>CardioPredict AI</span>
             </div>
             <p className="text-xs text-muted-foreground">
                Engineered with <Heart className="w-3 h-3 inline text-red-500 fill-red-500 mx-1 animate-pulse" /> by <span className="text-foreground font-medium">Jay Patel</span>
            </p>
        </div>

        {/* Copyright */}
        <div className="text-[10px] text-muted-foreground/40 uppercase tracking-widest font-medium">
            © {currentYear} All Rights Reserved
        </div>

      </div>
    </motion.footer>
  );
}
