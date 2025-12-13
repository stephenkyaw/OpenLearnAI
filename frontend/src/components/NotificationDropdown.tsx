
import { useState, useRef, useEffect } from "react";
import { Bell, Check, Clock, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface Notification {
    id: string;
    title: string;
    description: string;
    time: string;
    read: boolean;
    type: 'info' | 'success' | 'warning' | 'alert';
}

const MOCK_NOTIFICATIONS: Notification[] = [
    {
        id: '1',
        title: 'New Lesson Available',
        description: 'Advanced Negotiation Strategies is now ready for you.',
        time: '2m ago',
        read: false,
        type: 'info'
    },
    {
        id: '2',
        title: 'Assignment Graded',
        description: 'Your essay on "Business Etiquette" scored 95%. Excellent work!',
        time: '1h ago',
        read: false,
        type: 'success'
    },
    {
        id: '3',
        title: 'System Maintenance',
        description: 'Scheduled maintenance on Saturday at 2:00 AM UTC.',
        time: '1d ago',
        read: true,
        type: 'warning'
    },
    {
        id: '4',
        title: 'Welcome to OpenLearn',
        description: 'Thanks for joining! Start your first course today.',
        time: '2d ago',
        read: true,
        type: 'info'
    }
];

export function NotificationDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const unreadCount = notifications.filter(n => !n.read).length;

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const markAsRead = (id: string) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'success': return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
            case 'warning': return "text-amber-500 bg-amber-500/10 border-amber-500/20";
            case 'alert': return "text-destructive bg-destructive/10 border-destructive/20";
            default: return "text-blue-500 bg-blue-500/10 border-blue-500/20";
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <Button
                variant="ghost"
                size="icon"
                className={cn(
                    "relative rounded-full h-10 w-10 transition-all duration-300",
                    isOpen ? "bg-primary/10 text-primary ring-2 ring-primary/20" : "hover:bg-muted text-muted-foreground hover:text-foreground",
                    unreadCount > 0 && !isOpen && "text-foreground"
                )}
                onClick={() => setIsOpen(!isOpen)}
            >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                    <span className="absolute top-2 right-2.5 h-2 w-2 bg-red-500 rounded-full ring-2 ring-background animate-pulse" />
                )}
            </Button>

            {isOpen && (
                <div className="absolute right-0 mt-3 w-80 md:w-96 rounded-2xl shadow-xl shadow-black/5 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right border border-border/60 bg-popover/95 backdrop-blur-xl text-popover-foreground">
                    {/* Header */}
                    <div className="p-4 border-b border-border/40 flex items-center justify-between bg-muted/30">
                        <div className="flex items-center gap-2">
                            <h3 className="font-bold text-sm">Notifications</h3>
                            {unreadCount > 0 && (
                                <Badge variant="secondary" className="h-5 px-1.5 text-[10px] font-bold">
                                    {unreadCount} New
                                </Badge>
                            )}
                        </div>
                        {unreadCount > 0 && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={markAllAsRead}
                                className="h-7 px-2 text-xs text-muted-foreground hover:text-primary"
                            >
                                Mark all read
                            </Button>
                        )}
                    </div>

                    {/* Content */}
                    <ScrollArea className="h-[400px]">
                        <div className="p-2 space-y-1">
                            {notifications.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-40 text-muted-foreground text-sm">
                                    <Bell className="h-8 w-8 mb-2 opacity-20" />
                                    <p>No notifications</p>
                                </div>
                            ) : (
                                notifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        onClick={() => markAsRead(notification.id)}
                                        className={cn(
                                            "group p-3 rounded-xl transition-all cursor-pointer border border-transparent relative",
                                            notification.read
                                                ? "hover:bg-muted/50 opacity-70 hover:opacity-100"
                                                : "bg-background shadow-sm border-border/40 hover:border-primary/20 hover:shadow-md"
                                        )}
                                    >
                                        {!notification.read && (
                                            <div className="absolute top-4 right-4 h-1.5 w-1.5 rounded-full bg-primary ring-4 ring-primary/10" />
                                        )}

                                        <div className="flex gap-3">
                                            <div className={cn(
                                                "h-9 w-9 rounded-full flex items-center justify-center shrink-0 mt-0.5 border",
                                                getTypeColor(notification.type)
                                            )}>
                                                {notification.type === 'success' ? <Check className="h-4 w-4" /> :
                                                    notification.type === 'warning' ? <Radio className="h-4 w-4" /> :
                                                        <Bell className="h-4 w-4" />}
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <div className="flex justify-between items-start pr-4">
                                                    <p className={cn("text-sm font-semibold leading-none", !notification.read && "text-foreground")}>
                                                        {notification.title}
                                                    </p>
                                                </div>
                                                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                                                    {notification.description}
                                                </p>
                                                <div className="flex items-center gap-1 text-[10px] text-muted-foreground pt-1 font-medium bg-transparent">
                                                    <Clock className="h-3 w-3" /> {notification.time}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </ScrollArea>

                    {/* Footer */}
                    <div className="p-2 border-t border-border/40 bg-muted/30">
                        <Button variant="ghost" className="w-full text-xs h-8 text-muted-foreground">
                            View All History
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
