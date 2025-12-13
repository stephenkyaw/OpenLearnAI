import type { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    BookOpen,
    FileText,
    Settings,
    LogOut,
    Menu,
    X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { NotificationDropdown } from "@/components/NotificationDropdown";

interface DashboardLayoutProps {
    children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Close mobile menu on route change
    useEffect(() => {
        setMobileOpen(false);
    }, [location.pathname]);

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-background flex font-sans selection:bg-primary/20 relative overflow-hidden">

            {/* Mobile Overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden animate-in fade-in duration-200"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar - Desktop & Mobile Drawer */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-72 p-6 transition-transform duration-300 ease-out lg:static lg:translate-x-0 lg:inset-auto lg:h-[calc(100vh)] lg:flex lg:flex-col",
                    mobileOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="h-full rounded-none lg:rounded-3xl flex flex-col overflow-hidden border-r lg:border border-border/40 shadow-xl shadow-black/5 bg-card/80 backdrop-blur-xl">
                    {/* Header */}
                    <div className="h-20 flex items-center px-6 border-b border-border/40">
                        <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary mr-3 shadow-sm">
                            <BookOpen className="h-5 w-5" />
                        </div>
                        <span className="font-bold text-lg tracking-tight text-foreground">OpenLearn</span>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="ml-auto lg:hidden text-muted-foreground hover:text-foreground"
                            onClick={() => setMobileOpen(false)}
                        >
                            <X className="h-6 w-6" />
                        </Button>
                    </div>

                    {/* Navigation Items */}
                    <div className="flex-1 py-8 px-6 overflow-y-auto">
                        <div className="space-y-6">
                            <div>
                                <div className="px-4 mb-3 text-xs font-bold text-muted-foreground uppercase tracking-widest opacity-70">Workspace</div>
                                <div className="space-y-2">
                                    <SidebarItem icon={<LayoutDashboard />} label="Dashboard" to="/dashboard" />
                                    <SidebarItem icon={<BookOpen />} label="My Courses" to="/dashboard/courses" />
                                    <SidebarItem icon={<FileText />} label="Document Library" to="/dashboard/library" />
                                </div>
                            </div>

                            <div>
                                <div className="px-4 mb-3 text-xs font-bold text-muted-foreground uppercase tracking-widest opacity-70">Management</div>
                                <div className="space-y-2">
                                    <SidebarItem icon={<Settings />} label="Settings" to="/dashboard/settings" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* User Footer */}
                    <div className="p-6 mt-auto border-t border-border/50 bg-muted/20">
                        <div className="flex items-center space-x-3 mb-4 px-2">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-md ring-2 ring-white">
                                JD
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-bold truncate text-foreground">John Doe</p>
                                <p className="text-xs text-muted-foreground truncate">john@example.com</p>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start text-muted-foreground hover:bg-red-50 hover:text-red-600 h-10 px-4 rounded-xl transition-colors font-medium"
                            onClick={handleLogout}
                        >
                            <LogOut className="h-4 w-4 mr-3" /> Log out
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Main Content Wrapper */}
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">

                {/* Mobile Header Bar */}
                <div className="lg:hidden h-16 flex items-center justify-between px-4 sticky top-0 z-30">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="bg-white/80 backdrop-blur-md rounded-xl shadow-sm border border-white/50"
                        onClick={() => setMobileOpen(true)}
                    >
                        <Menu className="h-6 w-6 text-foreground" />
                    </Button>
                    <div className="font-bold text-lg text-foreground">OpenLearn</div>
                    <div className="w-10" /> {/* Spacer for balance */}
                </div>

                {/* DESKTOP layout: Main Content (No global glass box, per user feedback) */}
                <div className="flex-1 lg:p-6 lg:pl-0 h-full overflow-hidden flex flex-col">
                    <div className="flex-1 flex flex-col overflow-hidden mx-4 lg:mx-0 mb-4 lg:mb-0 relative">

                        {/* Top Desktop Bar (Minimal - Notifications Only) */}
                        <div className="hidden lg:flex items-center justify-end px-6 py-4 gap-3">
                            <ModeToggle />
                            <NotificationDropdown />
                            <Link to="/dashboard/profile">
                                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white text-xs font-bold cursor-pointer hover:ring-2 hover:ring-primary/30 transition-all">
                                    JD
                                </div>
                            </Link>
                        </div>

                        {/* Page Content */}
                        <div className="flex-1 overflow-y-auto p-4 lg:p-0">
                            <div className="max-w-7xl mx-auto space-y-6">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function SidebarItem({ icon, label, to }: { icon: ReactNode, label: string, to: string }) {
    const location = useLocation();
    const isActive = location.pathname === to || (to !== '/dashboard' && location.pathname.startsWith(to));

    return (
        <Link to={to} className="block">
            <Button
                variant="ghost"
                className={cn(
                    "w-full justify-start h-12 mb-1 px-4 font-medium transition-all duration-300 rounded-xl",
                    isActive
                        ? "bg-gradient-to-r from-primary to-violet-600 text-white shadow-glow hover:opacity-90"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )}
            >
                <span className={cn("mr-4 h-5 w-5", isActive ? "text-white" : "text-muted-foreground group-hover:text-foreground")}>{icon}</span>
                <span className="text-sm tracking-wide">{label}</span>
            </Button>
        </Link>
    )
}




