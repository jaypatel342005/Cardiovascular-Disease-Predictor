"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Facebook, Instagram, Hash, Database, Code2, Brain, Terminal, Cpu, Trophy, Coffee, GitCommit, Users, HeartPulse, GraduationCap, Code } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TechStack } from "@/components/tech-stack";
import { ProjectList } from "@/components/project-list";

import { useState } from "react";

export default function AboutPage() {
  const [imageError, setImageError] = useState(false);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/jaypatel342005",
      icon: Github,
      color: "hover:text-white hover:bg-black",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/jaypatel345/",
      icon: Linkedin,
      color: "hover:text-white hover:bg-[#0077b5]",
    },
    {
      name: "Kaggle",
      href: "https://www.kaggle.com/jaypatel345",
      icon: Database,
      color: "hover:text-white hover:bg-[#20BEFF]",
    },
    {
      name: "Instagram",
      href: "https://instagram.com/ll_jay.patel.345_ll",
      icon: Instagram,
      color: "hover:text-white hover:bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045]",
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/jay.patel.14838",
      icon: Facebook,
      color: "hover:text-white hover:bg-[#1877F2]",
    },
    {
      name: "Threads",
      href: "https://www.threads.com/@ll_jay.patel.345_ll",
      icon: Hash,
      color: "hover:text-white hover:bg-black",
    },
  ];

  const stats = [
    { label: "Repositories", value: "20+", icon: GitCommit },
    { label: "Technologies", value: "10+", icon: Cpu },
    { label: "Problem Solving", value: "Active", icon: Code },
    { label: "Education", value: "B.Tech", icon: GraduationCap },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full mix-blend-screen" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full mix-blend-screen" />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-16"
        >
          {/* Hero Section */}
          <motion.div variants={item} className="flex flex-col items-center text-center space-y-6 pt-10">
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-heartbeat" />
                <div className="relative w-40 h-40 rounded-full bg-background p-1 overflow-hidden">
                    {imageError ? (
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center text-5xl font-bold text-primary overflow-hidden">
                            JP
                        </div>
                    ) : (
                        <Image 
                          src="https://ik.imagekit.io/ExpenseManager/jaypatel.jpg?updatedAt=1767358147818" 
                          alt="Jay Patel" 
                          fill 
                          className="object-cover rounded-full"
                          onError={() => setImageError(true)}
                        />
                    )}
                </div>
            </div>
            
            <div className="space-y-4 max-w-3xl">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent pb-2">
                Jay Patel
              </h1>
              <div className="flex flex-wrap justify-center gap-2 text-xl md:text-2xl text-muted-foreground font-medium">
                <span>Full Stack Developer</span>
                <span className="hidden md:inline">•</span>
                <span>AI/ML Enthusiast</span>
                <span className="hidden md:inline">•</span>
                <span>Problem Solver</span>
              </div>
              
               <div className="flex justify-center gap-2 mt-2">
                  <Badge variant="outline" className="text-xs py-1 px-3 border-primary/30 bg-primary/5">
                    Open for Opportunities
                  </Badge>
                  <Badge variant="outline" className="text-xs py-1 px-3 border-purple-500/30 bg-purple-500/5">
                    Based in India
                  </Badge>
               </div>
            </div>

            <p className="max-w-2xl mx-auto text-muted-foreground leading-relaxed text-lg">
              Creating intelligent digital solutions. Specializing in <strong className="text-foreground">Machine Learning</strong> & <strong className="text-foreground">AI</strong>, 
              building dynamic <strong className="text-foreground">Full Stack</strong> web applications (MERN, Next.js), and architecting robust <strong className="text-foreground">.NET</strong> systems.
              I bridge the gap between complex data and intuitive user experiences.
            </p>
          </motion.div>

          {/* Stats Grid */}
           <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
             {stats.map((stat, i) => (
               <Card key={i} className="bg-card/30 backdrop-blur border-primary/10 hover:bg-card/50 transition-colors">
                 <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
                   <div className="p-3 rounded-full bg-primary/10 text-primary mb-2">
                     <stat.icon className="w-6 h-6" />
                   </div>
                   <div className="text-3xl font-bold">{stat.value}</div>
                   <div className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                 </CardContent>
               </Card>
             ))}
           </motion.div>

          {/* Tech Stack Marquee */}
           <motion.div variants={item}>
             <TechStack />
           </motion.div>

          {/* Featured Projects */}
          <motion.div variants={item} className="space-y-8">
            <div className="flex flex-col items-center text-center space-y-2">
              <h2 className="text-3xl font-bold">Featured Projects</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-primary to-purple-600 rounded-full" />
              <p className="text-muted-foreground max-w-xl">
                 A selection of my recent work in Web Development, App Development, and Artificial Intelligence.
              </p>
            </div>
            <ProjectList />
          </motion.div>

          {/* Connect Section */}
          <motion.div variants={item} className="py-12">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 border border-primary/10 p-8 md:p-12 text-center space-y-8">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500" />
               
               <h2 className="text-3xl font-bold">Let's Connect & Collaborate</h2>
               <p className="max-w-xl mx-auto text-muted-foreground">
                 Whether you have a question, a project idea, or just want to say hi, I'm always open to discussing new opportunities.
               </p>

               <div className="flex flex-wrap justify-center gap-6">
                 {socialLinks.map((link) => (
                    <Link 
                      key={link.name} 
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col items-center gap-2"
                    >
                      <div className={`p-4 rounded-2xl bg-background shadow-lg ring-1 ring-border group-hover:ring-2 group-hover:ring-primary/50 group-hover:-translate-y-2 transition-all duration-300 ${link.color}`}>
                        <link.icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                        {link.name}
                      </span>
                    </Link>
                 ))}
               </div>
               
               <div className="pt-8">
                 <Button size="lg" className="rounded-full px-12 py-6 text-lg bg-gradient-to-r from-primary to-purple-600 hover:scale-105 transition-transform shadow-xl shadow-primary/20">
                   Contact Me
                 </Button>
               </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}
