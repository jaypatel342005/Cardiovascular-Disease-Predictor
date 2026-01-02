"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Star, GitFork } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    title: "Cardiovascular Disease Predictor",
    description: "Advanced ML-powered application for early cardiac health assessment using XGBoost and Shadcn UI.",
    tags: ["Python", "XGBoost", "Next.js", "FastAPI", "Machine Learning"],
    link: "https://github.com/jaypatel342005/Cardiovascular-Disease-Predictor",
    stars: 12, // Simulated
    forks: 4
  },
  {
    title: "Machine Learning & DL",
    description: "Comprehensive collection of ML and Deep Learning models, notebooks, and experiments.",
    tags: ["Jupyter", "TensorFlow", "Pandas", "Scikit-learn"],
    link: "https://github.com/jaypatel342005/Machine-Learning-and-Deep-Learning",
    stars: 15,
    forks: 6
  },
  {
    title: "Expense Manager",
    description: "Full-stack application to track and analyze personal finances with detailed charts and reports.",
    tags: ["MERN Stack", "React", "Node.js", "MongoDB", "Chart.js"],
    link: "https://github.com/jaypatel342005/Expense-Manager",
    stars: 4,
    forks: 0
  },
  {
    title: "Matrimony Flutter App",
    description: "Mobile application for matchmaking built with Flutter, featuring user profiles, search, and realtime connections.",
    tags: ["Flutter", "Dart", "Mobile", "Firebase"],
    link: "https://github.com/jaypatel342005/Matrimony-Flutter-App",
    stars: 3,
    forks: 1
  },
  {
    title: "Hospital Management System",
    description: "A modern ASP.NET MVC application with secure patient-doctor workflows, appointment scheduling, and Azure cloud deployment.",
    tags: ["C#", "ASP.NET MVC", "Azure", "SQL", "Bootstrap"],
    link: "https://github.com/jaypatel342005/Hospital-Management-System",
    stars: 5, // Simulated
    forks: 2
  },
  {
    title: "Github Commiter Bot",
    description: "Automation tool to manage and schedule GitHub contributions effectively.",
    tags: ["Python", "Automation", "Git", "Scripting"],
    link: "https://github.com/jaypatel342005/Github-Commiter-Bot",
    stars: 8,
    forks: 2
  }
];

export function ProjectList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
        >
            <Card className="h-full flex flex-col group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-primary/10">
            <CardHeader>
                <div className="flex justify-between items-start mb-2">
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Github className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex gap-2 text-muted-foreground">
                        <span className="flex items-center text-xs gap-1"><Star className="w-3 h-3" />{project.stars}</span>
                        <span className="flex items-center text-xs gap-1"><GitFork className="w-3 h-3" />{project.forks}</span>
                    </div>
                </div>
                <CardTitle className="line-clamp-1 group-hover:text-primary transition-colors">{project.title}</CardTitle>
                <CardDescription className="line-clamp-3">{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs bg-secondary/50">{tag}</Badge>
                ))}
                </div>
            </CardContent>
            <CardFooter>
                <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                <Link href={project.link} target="_blank">
                    View Project <ExternalLink className="w-4 h-4 ml-2" />
                </Link>
                </Button>
            </CardFooter>
            </Card>
        </motion.div>
      ))}
    </div>
  );
}
