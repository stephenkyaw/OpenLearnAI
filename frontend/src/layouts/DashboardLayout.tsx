import type { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    BookOpen,
    FileText,
    Settings,
    LogOut,
    Menu,
    Bell,
    X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { ModeToggle } from "@/components/mode-toggle";

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
                            <BellWithDropdown />
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
                        ? "bg-primary text-white shadow-lg shadow-primary/25 hover:bg-primary/90"
                        : "text-muted-foreground hover:bg-black/5 hover:text-foreground"
                )}
            >
                <span className={cn("mr-4 h-5 w-5", isActive ? "text-white" : "text-muted-foreground group-hover:text-foreground")}>{icon}</span>
                <span className="text-sm tracking-wide">{label}</span>
            </Button>
        </Link>
    )
}

function BellWithDropdown() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <Button
                variant="ghost"
                size="icon"
                className="relative bg-white/50 backdrop-blur-md hover:bg-white/80 rounded-full h-10 w-10 shadow-sm border border-white/50 transition-all"
                onClick={() => setIsOpen(!isOpen)}
            >
                <Bell className="h-5 w-5 text-muted-foreground" />
                <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-red-500 rounded-full ring-2 ring-white" />
            </Button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                    <div className="absolute right-0 mt-3 w-96 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right border border-border bg-popover text-popover-foreground">
                        <div className="p-4 border-b border-border/50">
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-base text-foreground">Notifications</h3>
                                <span className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-semibold border border-primary/20">3 New</span>
                            </div>
                        </div>
                        <div className="max-h-[400px] overflow-y-auto p-2">
                            <NotificationItem
                                title="New Lesson Added"
                                time="2m ago"
                                desc="Advanced Negotiation Strategies is now available."
                                color="text-blue-500 dark:text-blue-400"
                                bgColor="bg-blue-500/10"
                                borderColor="border-blue-500/20"
                            />
                            <NotificationItem
                                title="Assignment Graded"
                                time="1h ago"
                                desc="Your essay on 'Business Etiquette' scored 95%."
                                color="text-green-500 dark:text-green-400"
                                bgColor="bg-green-500/10"
                                borderColor="border-green-500/20"
                            />
                            <NotificationItem
                                title="System Alert"
                                time="1d ago"
                                desc="Scheduled maintenance on Saturday at 2:00 AM UTC."
                                color="text-orange-500 dark:text-orange-400"
                                bgColor="bg-orange-500/10"
                                borderColor="border-orange-500/20"
                            />
                        </div>
                        <div className="p-3 border-t border-border/50 bg-muted/30">
                            <Button variant="ghost" size="sm" className="w-full text-sm h-9 text-muted-foreground font-medium hover:bg-muted/50 hover:text-foreground">
                                Mark all as read
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

function NotificationItem({ title, time, desc, color, bgColor, borderColor }: { title: string, time: string, desc: string, color: string, bgColor: string, borderColor: string }) {
    return (
        <div className={cn("p-3 rounded-xl transition-all cursor-pointer group mb-2 border", bgColor, borderColor, "hover:shadow-sm")}>
            <div className="flex justify-between items-start mb-1.5">
                <span className={cn("font-semibold text-sm", color)}>{title}</span>
                <span className="text-xs text-muted-foreground font-medium">{time}</span>
            </div>
            <p className="text-xs text-muted-foreground/80 leading-relaxed">{desc}</p>
        </div>
    )
}
