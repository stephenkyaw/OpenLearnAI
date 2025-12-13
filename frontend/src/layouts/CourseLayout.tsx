import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

interface CourseLayoutProps {
    children: ReactNode;
    title: string;
}

export function CourseLayout({ children, title }: CourseLayoutProps) {
    return (
        <div className="h-screen flex flex-col font-sans bg-background selection:bg-primary/20 overflow-hidden">
            {/* Header */}
            <header className="h-16 flex-none flex items-center justify-between px-4 md:px-6 border-b border-border/40 bg-card/80 backdrop-blur-xl sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <Link to="/dashboard/courses">
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground pl-0 md:pl-3">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            <span className="hidden md:inline">Back to Dashboard</span>
                            <span className="md:hidden">Back</span>
                        </Button>
                    </Link>
                    <div className="h-6 w-px bg-border/50 hidden md:block" />
                    <div className="flex items-center gap-2 hidden md:flex">
                        <div className="h-8 w-8 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                            <BookOpen className="h-4 w-4" />
                        </div>
                        <span className="font-bold text-sm tracking-tight text-foreground truncate max-w-[200px] lg:max-w-md">{title}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 md:gap-4">
                    <ModeToggle />
                    <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-foreground hidden sm:flex">
                        <Bell className="h-5 w-5" />
                    </Button>
                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white text-xs font-bold cursor-default ring-2 ring-background shadow-sm">
                        JD
                    </div>
                </div>
            </header>

            {/* Main Content Area - Full Screen Mode */}
            <main className="flex-1 flex flex-col min-h-0 relative bg-background">
                {children}
            </main>
        </div>
    )
}
