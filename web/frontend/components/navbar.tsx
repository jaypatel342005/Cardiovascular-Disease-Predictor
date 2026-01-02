"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeartPulse, History, User, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./mode-toggle";

export function Navbar() {
  const pathname = usePathname();

  const routes = [
    {
      href: "/",
      label: "About Project",
      icon: Activity,
      active: pathname === "/",
    },
    {
      href: "/assessment",
      label: "Start Assessment",
      icon: HeartPulse,
      active: pathname === "/assessment",
    },
    {
      href: "/history",
      label: "History",
      icon: History,
      active: pathname === "/history",
    },
    {
      href: "/about",
      label: "About Me",
      icon: User,
      active: pathname === "/about",
    },
  ];

  return (
    <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="flex h-16 items-center px-6 container mx-auto">
        <div className="flex items-center gap-2 mr-8">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
                <HeartPulse className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                CardioAI
            </span>
        </div>
        
        <div className="flex items-center space-x-4 lg:space-x-6 mx-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary flex items-center gap-2",
                route.active
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              <route.icon className="w-4 h-4" />
              {route.label}
            </Link>
          ))}
        </div>

        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
