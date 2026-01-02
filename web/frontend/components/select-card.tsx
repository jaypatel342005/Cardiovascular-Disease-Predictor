import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface SelectCardProps {
    id: string;
    title: string;
    description?: string;
    icon?: any;
    selected: boolean;
    onClick: () => void;
    className?: string; // Add className prop
}

export function SelectCard({ id, title, description, icon: Icon, selected, onClick }: SelectCardProps) {
    return (
        <div 
            role="button"
            tabIndex={0}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClick();
            }}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.stopPropagation();
                    onClick();
                }
            }}
            className={cn(
                "relative flex flex-col items-center justify-center p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 bg-card/50",
                selected 
                    ? "border-primary bg-primary/5 shadow-sm shadow-primary/10" 
                    : "border-border/50 hover:border-primary/50 hover:bg-muted/30",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            )}
        >
            {selected && (
                <div className="absolute top-1.5 right-1.5 p-0.5 bg-primary rounded-full text-primary-foreground">
                    <Check size={10} />
                </div>
            )}
            
            {Icon && (
                <div className={cn(
                    "p-2 rounded-full mb-2 transition-colors",
                    selected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}>
                    <Icon size={18} />
                </div>
            )}
            
            <h3 className={cn("font-medium text-sm", selected ? "text-primary" : "text-foreground")}>
                {title}
            </h3>
            
            {description && (
                <p className="text-xs text-muted-foreground mt-1 text-center font-medium">
                    {description}
                </p>
            )}
        </div>
    );
}
