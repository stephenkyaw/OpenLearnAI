import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
    X,
    MessageCircle,
    MoreVertical
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface CourseLayoutProps {
    children: ReactNode;
    title: string;
}

export function CourseLayout({ children, title }: CourseLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col font-sans selection:bg-primary/20">
            {/* Premium Solid Header */}
            <header className="h-20 flex items-center justify-between px-8 z-50">
                <div className="bg-white/50 backdrop-blur-sm border border-slate-200/60 px-2 py-2 pr-6 rounded-full flex items-center space-x-4 shadow-sm transition-all hover:bg-white hover:shadow-md hover:scale-[1.01] group">
                    <Link to="/dashboard">
                        <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-900 hover:bg-slate-100 h-10 px-4 rounded-full font-medium transition-colors">
                            <X className="h-4 w-4 mr-2" /> Exit
                        </Button>
                    </Link>
                    <div className="h-5 w-px bg-slate-200" />
                    <h1 className="font-bold text-sm text-slate-800 truncate max-w-[200px] md:max-w-md tracking-tight group-hover:text-primary transition-colors">
                        {title}
                    </h1>
                </div>

                <div className="flex items-center space-x-3">
                    <div className="bg-white border border-slate-100 px-2 py-1.5 rounded-full flex items-center space-x-1 shadow-sm">
                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-slate-400 hover:text-primary hover:bg-primary/5 transition-colors">
                            <MessageCircle className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-colors">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 overflow-hidden relative px-6 pb-6 pt-2">
                {children}
            </main>
        </div>
    )
}
