import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Clock, ArrowRight, Zap, FolderPlus, MessageSquare, Star, CheckCircle, Award, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export function DashboardHome() {
    return (
        <DashboardLayout>
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6 animate-fade-in">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-foreground bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                        Welcome back, John
                    </h1>
                    <p className="text-muted-foreground mt-2 text-lg">Here's what's happening in your workspace today.</p>
                </div>
                <Link to="/dashboard/courses">
                    <Button variant="premium" className="shadow-lg shadow-indigo-500/20">
                        <Zap className="h-4 w-4 mr-2" /> Resume Learning
                    </Button>
                </Link>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 animate-fade-in delay-100">
                <StatCard
                    icon={<BookOpen className="text-blue-600 dark:text-blue-400" />}
                    label="Active Courses"
                    value="12"
                    sub="Currently Enrolled"
                    trend="+2 this week"
                />
                <StatCard
                    icon={<CheckCircle className="text-emerald-600 dark:text-emerald-400" />}
                    label="Completed Courses"
                    value="4"
                    sub="Fully Finished"
                    trend="+1 this month"
                />
                <StatCard
                    icon={<Award className="text-purple-600 dark:text-purple-400" />}
                    label="Certificates"
                    value="3"
                    sub="Earned"
                    trend="Top 5% Student"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Action Area */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Resume Hero - Glass/Gradient Card */}
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-700 text-white shadow-xl shadow-indigo-500/20 p-8 group animate-fade-in delay-200">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-white/20 transition-all duration-500" />
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center space-x-2 text-white/90 text-sm font-semibold bg-white/20 px-3 py-1 rounded-full border border-white/20 backdrop-blur-sm">
                                    <Clock className="h-3 w-3" />
                                    <span>Jump back in</span>
                                </div>
                                <Link to="/dashboard/courses" className="text-sm font-medium text-white/80 hover:text-white transition-colors flex items-center">
                                    View All <ArrowRight className="h-3 w-3 ml-1" />
                                </Link>
                            </div>

                            <div className="flex flex-col sm:flex-row items-start gap-6">
                                <div className="h-20 w-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white shrink-0 shadow-inner border border-white/20">
                                    <BookOpen className="h-10 w-10" />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-bold mb-2">English for Business</h3>
                                    <p className="text-indigo-100 mb-6 max-w-lg text-lg leading-relaxed">Continue Module 3: Negotiation Skills & Strategies. You're on a 5 day streak!</p>
                                    <Link to="/course/english">
                                        <Button size="lg" className="bg-white text-indigo-600 hover:bg-white/90 border-0 shadow-lg shadow-black/10">
                                            Continue Lesson <ArrowRight className="h-4 w-4 ml-2" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* In Progress Courses List */}
                    <div className="animate-fade-in delay-300">
                        <div className="flex items-center justify-between mb-5 px-1">
                            <h3 className="text-xl font-bold text-foreground flex items-center">
                                <Zap className="h-5 w-5 mr-2 text-orange-500" /> In Progress
                            </h3>
                        </div>
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
                    <div className="animate-fade-in delay-500">
                        <div className="flex items-center justify-between mb-5 px-1">
                            <h3 className="text-xl font-bold text-foreground flex items-center">
                                <Clock className="h-5 w-5 mr-2 text-blue-500" /> Recently Viewed
                            </h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <RecentCourseCard title="Introduction to Python" lastAccess="2 days ago" />
                            <RecentCourseCard title="UI/UX Design Principles" lastAccess="5 days ago" />
                        </div>
                    </div>

                    {/* Quick Actions Grid */}
                    <div className="animate-fade-in delay-700">
                        <h3 className="text-xl font-bold px-1 mb-5 flex items-center">
                            <FolderPlus className="h-5 w-5 mr-2 text-primary" /> Quick Actions
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <Link to="/dashboard/upload">
                                <ActionCard icon={<FolderPlus />} label="Create Course" />
                            </Link>
                            <ActionCard icon={<MessageSquare />} label="New Quiz" />
                            <ActionCard icon={<BookOpen />} label="Browse" />
                            <ActionCard icon={<Star />} label="Review" />
                        </div>
                    </div>
                </div>

                {/* Right Sidebar - System Status / Activity */}
                <div className="space-y-6 lg:mt-0 animate-fade-in delay-300">
                    <Card className="border-border/60 shadow-lg shadow-black/5">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center">
                                <TrendingUp className="h-5 w-5 mr-2 text-primary" /> Activity
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <ActivityItem title="New Lesson Added" sub="Business English" time="2h ago" />
                            <ActivityItem title="Quiz Completed" sub="Score: 95%" time="5h ago" />
                            <ActivityItem title="Note Created" sub="Negotiation Types" time="1d ago" />
                            <ActivityItem title="Course Started" sub="Python Basics" time="3d ago" />
                            <ActivityItem title="Profile Updated" sub="New avatar" time="1w ago" />
                        </CardContent>
                    </Card>

                    <Card className="border-border/60 shadow-lg shadow-black/5">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg">System Status</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground font-medium">Learning Engine</span>
                                <span className="flex items-center text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full text-xs font-bold border border-emerald-500/20"><div className="h-1.5 w-1.5 bg-emerald-500 rounded-full mr-1.5 animate-pulse" /> Operational</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground font-medium">AI Tutor</span>
                                <span className="flex items-center text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full text-xs font-bold border border-emerald-500/20"><div className="h-1.5 w-1.5 bg-emerald-500 rounded-full mr-1.5 animate-pulse" /> Active</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}

function StatCard({ icon, label, value, sub, trend }: { icon: React.ReactNode, label: string, value: string, sub: string, trend?: string }) {
    return (
        <Card className="group hover:scale-[1.02] transition-all duration-300 border-border/60 shadow-sm hover:shadow-xl hover:shadow-primary/5 cursor-default">
            <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center shadow-sm group-hover:bg-primary/20 transition-colors border border-primary/10">
                        {icon}
                    </div>
                    {trend && <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">{trend}</span>}
                </div>
                <div>
                    <h3 className="text-4xl font-extrabold text-foreground tracking-tight mb-1">{value}</h3>
                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest opacity-80 mb-1">{label}</p>
                    <p className="text-xs text-muted-foreground/60 font-medium">{sub}</p>
                </div>
            </CardContent>
        </Card>
    )
}

function ActionCard({ icon, label }: { icon: React.ReactNode, label: string }) {
    return (
        <Card className="hover:scale-105 transition-all duration-300 cursor-pointer border-border/60 shadow-sm hover:shadow-lg hover:shadow-primary/10 group h-32 flex flex-col items-center justify-center p-0">
            <div className="h-12 w-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 mb-3 shadow-sm group-hover:shadow-glow">
                {icon}
            </div>
            <span className="text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors">{label}</span>
        </Card>
    )
}

function CourseProgressCard({ title, module, progress, color, icon }: { title: string, module: string, progress: number, color: string, icon: React.ReactNode }) {
    return (
        <Card className="p-4 flex items-center gap-5 hover:shadow-md transition-all cursor-pointer group border-border/60">
            <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center shadow-md shrink-0 text-white transition-transform group-hover:scale-105", color)}>
                {icon}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                    <h4 className="font-bold text-base text-foreground truncate group-hover:text-primary transition-colors">{title}</h4>
                    <span className="text-xs font-bold text-foreground bg-secondary px-2 py-0.5 rounded-md">{progress}%</span>
                </div>
                <p className="text-xs text-muted-foreground truncate mb-3">{module}</p>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div
                        className={cn("h-full rounded-full transition-all duration-1000", color)}
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary rounded-xl">
                <ArrowRight className="h-5 w-5" />
            </Button>
        </Card>
    )
}

function ActivityItem({ title, sub, time }: { title: string, sub: string, time: string }) {
    return (
        <div className="flex items-start gap-4 p-2 rounded-xl transition-colors cursor-default group">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 relative">
                <Clock className="h-5 w-5" />
                <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-0 group-hover:opacity-20 duration-1000" />
            </div>
            <div className="flex-1 overflow-hidden pt-0.5">
                <p className="text-sm font-bold truncate text-foreground group-hover:text-primary transition-colors">{title}</p>
                <p className="text-xs text-muted-foreground truncate">{sub}</p>
            </div>
            <span className="text-[10px] font-semibold text-muted-foreground/70 bg-secondary px-2 py-1 rounded-md whitespace-nowrap">{time}</span>
        </div>
    )
}

function RecentCourseCard({ title, lastAccess }: { title: string, lastAccess: string }) {
    return (
        <Card className="p-4 hover:shadow-md transition-all cursor-pointer group flex items-center gap-4 border-border/60">
            <div className="h-12 w-12 bg-secondary rounded-2xl flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                <BookOpen className="h-6 w-6" />
            </div>
            <div>
                <h4 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">{title}</h4>
                <p className="text-[10px] font-medium text-muted-foreground mt-0.5">Accessed {lastAccess}</p>
            </div>
        </Card>
    )
}

