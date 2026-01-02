"use client";

import { motion } from "framer-motion";
import { 
  Code2, Database, Globe, Server, Smartphone, Terminal, Layout, Cpu, 
  Layers, Box, Workflow, FileJson, Command, Hash, Braces, Brain, Cloud
} from "lucide-react";

const stack = [
  // ML & Python
  { name: "TensorFlow", icon: Brain, color: "text-orange-500" },
  { name: "GenAI", icon: Cpu, color: "text-purple-400" },
  { name: "Python", icon: Terminal, color: "text-blue-500" },
  
  // Full Stack (MERN / Next.js)
  { name: "React", icon: Code2, color: "text-blue-400" },
  { name: "Next.js", icon: Globe, color: "text-white" },
  { name: "MERN Stack", icon: Layers, color: "text-green-400" },
  { name: "Flutter", icon: Smartphone, color: "text-cyan-400" },
  { name: "HTML/CSS", icon: Layout, color: "text-pink-500" },

  // .NET & Cloud
  { name: "ASP.NET", icon: Server, color: "text-purple-500" },
  { name: "C#", icon: Hash, color: "text-green-500" },
  { name: "Azure", icon: Cloud, color: "text-blue-500" },
  { name: "SQL", icon: Database, color: "text-blue-600" },

  // Tools
  { name: "Git", icon: Command, color: "text-orange-600" },
];

export function TechStack() {
  return (
    <div className="w-full py-12 overflow-hidden bg-background/50 backdrop-blur-sm border-y border-primary/10">
      <div className="container mx-auto px-4 mb-8">
         <h2 className="text-2xl font-bold text-center mb-2">Technical Arsenal</h2>
         <p className="text-center text-muted-foreground text-sm">Technologies I use to build robust solutions</p>
      </div>
      
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
        
        <motion.div 
          className="flex gap-8 items-center w-max"
          animate={{ x: [0, -1000] }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "linear",
            repeatType: "loop"
          }}
        >
          {[...stack, ...stack].map((tech, i) => (
            <div 
              key={`${tech.name}-${i}`} 
              className="flex items-center gap-3 px-6 py-3 rounded-full bg-card border border-border/50 shadow-sm hover:border-primary/50 transition-colors"
            >
              <tech.icon className={`w-5 h-5 ${tech.color}`} />
              <span className="font-semibold whitespace-nowrap">{tech.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
