import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, ArrowRight, Zap, FolderPlus, MessageSquare, Star, CheckCircle, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export function DashboardHome() {
    return (
        <DashboardLayout>
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4 px-2">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome back, John</h1>
                    <p className="text-muted-foreground">Here's what's happening in your workspace today.</p>
                </div>
                <Link to="/dashboard/courses">
                    <Button className="rounded-full shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90">
                        <Zap className="h-4 w-4 mr-2" /> Resume Learning
                    </Button>
                </Link>
            </div>

            {/* Stats Overview - Solid White Pills */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <StatCard icon={<BookOpen className="text-blue-600 dark:text-blue-400" />} label="Active Courses" value="12" sub="Currently Enrolled" />
                <StatCard icon={<CheckCircle className="text-emerald-600 dark:text-emerald-400" />} label="Completed Courses" value="4" sub="Fully Finished" />
                <StatCard icon={<Award className="text-purple-600 dark:text-purple-400" />} label="Certificates" value="3" sub="Earned" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Action Area */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Resume Hero - Solid Card */}
                    <div className="bg-card rounded-3xl p-8 relative overflow-hidden group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 shadow-sm border border-border/50">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-primary/10 transition-colors" />

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center space-x-2 text-primary text-sm font-semibold bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                                    <Clock className="h-3 w-3" />
                                    <span>Jump back in</span>
                                </div>
                                <Link to="/dashboard/courses" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center">
                                    View All <ArrowRight className="h-3 w-3 ml-1" />
                                </Link>
                            </div>

                            <div className="flex items-start gap-6">
                                <div className="h-16 w-16 bg-primary rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/30">
                                    <BookOpen className="h-8 w-8" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-foreground mb-2">English for Business</h3>
                                    <p className="text-muted-foreground mb-4 max-w-md">Continue Module 3: Negotiation Skills & Strategies. You're on a 5 day streak!</p>
                                    <div className="flex items-center gap-4">
                                        <Link to="/course/english">
                                            <Button variant="default" className="rounded-xl">
                                                Continue Lesson <ArrowRight className="h-4 w-4 ml-2" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* In Progress Courses List */}
                    <div>
                        <h3 className="text-lg font-bold px-2 mb-4 text-foreground flex items-center">
                            <Zap className="h-5 w-5 mr-2 text-orange-500" /> In Progress
                        </h3>
                        <div className="space-y-4">
                            <CourseProgressCard
                                title="Advanced Public Speaking"
                                module="Module 2: Body Language"
                                progress={45}
                                color="bg-orange-500"
                                icon={<MessageSquare className="h-5 w-5 text-white" />}
                            />
                            <CourseProgressCard
                                title="Digital Marketing Fundamentals"
                                module="Module 5: SEO Basics"
                                progress={78}
                                color="bg-emerald-500"
                                icon={<Zap className="h-5 w-5 text-white" />}
                            />
                        </div>
                    </div>

                    {/* Recent Courses Grid */}
                    <div>
                        <h3 className="text-lg font-bold px-2 mb-4 text-foreground flex items-center">
                            <Clock className="h-5 w-5 mr-2 text-blue-500" /> Recently Viewed
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <RecentCourseCard title="Introduction to Python" lastAccess="2 days ago" />
                            <RecentCourseCard title="UI/UX Design Principles" lastAccess="5 days ago" />
                        </div>
                    </div>

                    {/* Quick Actions Grid */}
                    <div>
                        <h3 className="text-lg font-semibold px-2 mb-4 flex items-center">
                            <FolderPlus className="h-4 w-4 mr-2 text-primary" /> Quick Actions
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <ActionCard icon={<MessageSquare />} label="New Quiz" />
                            <ActionCard icon={<FolderPlus />} label="Add Note" />
                            <ActionCard icon={<BookOpen />} label="Browse" />
                            <ActionCard icon={<Star />} label="Review" />
                        </div>
                    </div>
                </div>

                {/* Right Sidebar - System Status / Activity */}
                <div className="space-y-6">
                    <div className="bg-card rounded-3xl p-6 shadow-sm border border-border/50">
                        <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide text-muted-foreground">Activity</h3>
                        <div className="space-y-4">
                            <ActivityItem title="New Lesson Added" sub="Business English" time="2h ago" />
                            <ActivityItem title="Quiz Completed" sub="Score: 95%" time="5h ago" />
                            <ActivityItem title="Note Created" sub="Negotiation Types" time="1d ago" />
                            <ActivityItem title="Course Started" sub="Python Basics" time="3d ago" />
                            <ActivityItem title="Profile Updated" sub="New avatar" time="1w ago" />
                        </div>
                    </div>

                    <div className="bg-card rounded-3xl p-6 shadow-sm border border-border/50">
                        <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide text-muted-foreground">System Status</h3>
                        <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-foreground">Learning Engine</span>
                            <span className="flex items-center text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full text-xs font-medium"><div className="h-1.5 w-1.5 bg-emerald-500 rounded-full mr-1.5" /> Operational</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-foreground">AI Tutor</span>
                            <span className="flex items-center text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full text-xs font-medium"><div className="h-1.5 w-1.5 bg-emerald-500 rounded-full mr-1.5" /> Active</span>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

function StatCard({ icon, label, value, sub }: { icon: React.ReactNode, label: string, value: string, sub: string }) {
    return (
        <div className="bg-card rounded-3xl p-6 flex items-center gap-6 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group shadow-sm border border-border/50">
            <div className="h-14 w-14 rounded-2xl bg-primary/5 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300 border border-primary/10">
                {icon}
            </div>
            <div>
                <h3 className="text-3xl font-bold text-foreground leading-none mb-1">{value}</h3>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-0.5">{label}</p>
                <p className="text-[10px] text-muted-foreground/70">{sub}</p>
            </div>
        </div>
    )
}

function ActionCard({ icon, label }: { icon: React.ReactNode, label: string }) {
    return (
        <div className="bg-card rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-3 hover:translate-y-[-2px] hover:shadow-lg transition-all duration-300 cursor-pointer group h-32 shadow-sm border border-border/50">
            <div className="h-10 w-10 rounded-full bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                {icon}
            </div>
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">{label}</span>
        </div>
    )
}

function CourseProgressCard({ title, module, progress, color, icon }: { title: string, module: string, progress: number, color: string, icon: React.ReactNode }) {
    return (
        <div className="bg-card rounded-2xl p-4 flex items-center gap-5 shadow-sm border border-border/50 hover:shadow-md transition-all cursor-pointer group">
            <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center shadow-sm shrink-0", color)}>
                {icon}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                    <h4 className="font-bold text-sm text-foreground truncate group-hover:text-primary transition-colors">{title}</h4>
                    <span className="text-xs font-semibold text-muted-foreground">{progress}%</span>
                </div>
                <p className="text-xs text-muted-foreground truncate mb-2">{module}</p>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div
                        className={cn("h-full rounded-full transition-all duration-1000", color)}
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                <ArrowRight className="h-4 w-4" />
            </Button>
        </div>
    )
}

function ActivityItem({ title, sub, time }: { title: string, sub: string, time: string }) {
    return (
        <div className="flex items-start gap-3 p-2 hover:bg-muted/50 rounded-xl transition-colors cursor-default">
            <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">
                <Clock className="h-4 w-4" />
            </div>
            <div className="flex-1 overflow-hidden">
                <p className="text-sm font-semibold truncate text-foreground">{title}</p>
                <p className="text-xs text-muted-foreground truncate">{sub}</p>
            </div>
            <span className="text-[10px] text-muted-foreground whitespace-nowrap">{time}</span>
        </div>
    )
}

function RecentCourseCard({ title, lastAccess }: { title: string, lastAccess: string }) {
    return (
        <div className="bg-card p-4 rounded-2xl shadow-sm border border-border/50 hover:shadow-md transition-all cursor-pointer group flex items-center gap-3">
            <div className="h-10 w-10 bg-muted/50 rounded-xl flex items-center justify-center text-muted-foreground">
                <BookOpen className="h-5 w-5" />
            </div>
            <div>
                <h4 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">{title}</h4>
                <p className="text-[10px] text-muted-foreground">Accessed {lastAccess}</p>
            </div>
        </div>
    )
}
