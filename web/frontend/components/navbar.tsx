"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeartPulse, History, User, Activity, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./mode-toggle";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

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
      <div className="flex h-16 items-center px-4 container mx-auto">
        {/* Mobile Menu */}
        <div className="md:hidden mr-2">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="w-5 h-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                    <SheetHeader>
                        <SheetTitle className="text-left flex items-center gap-2">
                             <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                                <HeartPulse className="w-5 h-5" />
                            </div>
                            CardioAI
                        </SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col gap-4 py-8">
                         {routes.map((route) => (
                            <Link
                                key={route.href}
                                href={route.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-primary flex items-center gap-3 p-2 rounded-md hover:bg-muted",
                                    route.active
                                    ? "text-foreground bg-muted font-semibold"
                                    : "text-muted-foreground"
                                )}
                            >
                                <route.icon className="w-4 h-4" />
                                {route.label}
                            </Link>
                        ))}
                    </div>
                </SheetContent>
            </Sheet>
        </div>

        <div className="flex items-center gap-2 mr-4 md:mr-8">
            <div className="hidden md:block p-2 rounded-xl bg-primary/10 text-primary">
                <HeartPulse className="w-6 h-6" />
            </div>
             <div className="md:hidden p-1.5 rounded-lg bg-primary/10 text-primary">
                <HeartPulse className="w-5 h-5" />
            </div>
            <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                CardioAI
            </span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4 lg:space-x-6 mx-6">
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
