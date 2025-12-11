import type { ReactNode } from "react";
interface CourseLayoutProps {
    children: ReactNode;
    title: string;
}

export function CourseLayout({ children }: CourseLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col font-sans selection:bg-primary/20">
            {/* Main Content Area - Full Screen Mode */}
            <main className="flex-1 overflow-hidden relative px-4 py-4 md:px-6 md:py-6">
                {children}
            </main>
        </div>
    )
}
